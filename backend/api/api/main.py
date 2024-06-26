
from typing import Annotated, List, Optional, Any

import logging
import uuid
from datetime import datetime
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from pydantic import ValidationError, EmailStr, BaseModel


from sqlmodel import SQLModel, create_engine, Session, Field, Relationship, select
from fastapi import FastAPI, Depends, Request, Response, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware

from .setting import DATABASE_URL

load_dotenv()

class ProjectCategoryLink(SQLModel, table=True):
    project_id: str = Field(default=None, foreign_key="project.id", primary_key=True)
    category_id: str = Field(default=None, foreign_key="category.id", primary_key=True)

# User Model
class User(SQLModel, table=True):
    id: str = Field (primary_key=True)
    name: str = Field(nullable=False)
    username: str = Field(unique=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)
    
    tasks: List["Task"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    projects: List["Project"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    categories: List["Category"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

# Task Model
class Task(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    due_time: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False, nullable=False)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="tasks")
    
    project_id: str = Field(default=None, foreign_key="project.id")
    project: Optional["Project"] = Relationship(back_populates="tasks")
    
    sub_tasks: List["SubTask"] = Relationship(back_populates="task", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

# SubTask Model
class SubTask(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    task_id: str = Field(foreign_key="task.id", nullable=False)
    task: "Task" = Relationship(back_populates="sub_tasks")

# Project Model
class Project(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    description: str = Field(nullable=False)
    is_completed: bool = Field(default=False)
    icon: str = Field(default="")
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="projects")
    
    tasks: List["Task"] = Relationship(back_populates="project", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    categories: List["Category"] = Relationship(back_populates="projects", link_model=ProjectCategoryLink)

# Category Model
class Category(SQLModel, table=True):
    id: str = Field(primary_key=True)
    title: str = Field(nullable=False, index=True)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="categories")
    
    projects: List["Project"] = Relationship(back_populates="categories", link_model=ProjectCategoryLink)

class UserUpdate(BaseModel):
    name: Optional[str]
    username: Optional[str]
    email: Optional[EmailStr]

class  CreateCategory(BaseModel):
    id: str
    title: str
    userId: str

class EditCategory(BaseModel):
    title: str

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

connection_string: str = str(DATABASE_URL).replace("postgresql","postgresql+psycopg2")

engine = create_engine(connection_string, echo=True)

def create_table():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables")
    create_table()
    print("Tables created")
    yield

app: FastAPI = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'message': 'Hello World'}

# User sign up endpoint
@app.post("/sign-up", response_model=User)
async def handle_user_signup(
    user_data: User,
    session: Annotated[Session, Depends(get_session)]
):
    logger.info(f"Received user_data: {user_data}")

    try:
        user = User(
            id= user_data.id,
            name=user_data.name,
            username=user_data.username,
            email=user_data.email,
            created_at=datetime.now()
            
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    except ValidationError as e:
        raise HTTPException(status_code=404, detail=str(e))


#User update api endpoint
@app.patch('/user/update/{user_id}', response_model=User)
async def handle_user_update(user_id: str, user_data: UserUpdate, session: Annotated[Session, Depends(get_session)]):
    try:
        user = session.exec(select(User).where(User.id == user_id)).first()
        if user:
            if user_data.name is not None:
                user.name = user_data.name
            if user_data.username is not None:
                user.username = user_data.username
            if user_data.email is not None:
                user.email = user_data.email

            session.commit()
            session.refresh(user)
            return user
        else:
            logger.error("User not found")
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as error:
        logger.error(f"Error updating user data: {error}")
        raise HTTPException(status_code=500, detail=str(error))


#User delete api endpoint
@app.delete('/user/delete/{user_id}', response_model=User)
async def handle_delete_user(user_id: str, session: Annotated[Session, Depends(get_session)]):
    try:
        user = session.exec(select(User).where(User.id == user_id)).first()
        if user:
            session.delete(user)
            session.commit()
            return user
        else:
            logger.error("User not found")
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        logger.error(f"Error deleting user data: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# Get the list of all categories
@app.get('/category/all', response_model=List[Category])
async def get_all_categories(session: Session = Depends(get_session), x_user_id: str = Header(...)):
    logger.info(f"Received user ID: {x_user_id}")
    try:
        category_list = session.exec(select(Category).where(Category.creator_id == x_user_id)).all()
        return category_list
    except Exception as e:
        logger.error(f"Error getting category list: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Create a category api endpoint
@app.post('/category', response_model=Category)
async def handle_create_category(category_data: CreateCategory, session: Annotated[Session, Depends(get_session)]):
    try:
        existing_category = session.exec(select(Category).where(Category.title == category_data.title)).first()
        if existing_category:
            logger.error("Category already exists")
            raise HTTPException(status_code=409, detail="Category already exists")
        
        category = Category(
            id= category_data.id,
            title=category_data.title,
            created_at=datetime.now(),
            creator_id=category_data.userId
        )
        session.add(category)
        session.commit()
        session.refresh(category)
        return category
    except Exception as e:
        logger.error(f"Error creating category: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# Edit category api endpoint
@app.patch('/category/edit/{category_id}', response_model=Category)
async def handle_edit_category(
    category_id: str, 
    category_data: EditCategory,
    session: Session = Depends(get_session), 
    x_user_id: str = Header(...)
):
    try:
        category = session.exec(
            select(Category).where((Category.id == category_id) & (Category.creator_id == x_user_id))
        ).first()
        
        if category:
            category.title = category_data.title
            session.commit()
            session.refresh(category)
            return category
        else:
            logger.error("Category not found")
            raise HTTPException(status_code=404, detail="Category not found")
    except Exception as e:
        logger.error(f"Error updating category: {e}")
        raise HTTPException(status_code=500, detail=str(e))