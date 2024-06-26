
from typing import Annotated, List

import os

import requests
import uuid
from datetime import datetime
from contextlib import asynccontextmanager
from dotenv import load_dotenv


from sqlmodel import SQLModel, create_engine, Session, Field, Relationship, select
from fastapi import FastAPI, Depends, Request, Response, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .setting import DATABASE_URL
from .utils.hashed_password import hashed_password

load_dotenv()



class User(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(nullable=False)
    username: str = Field(unique=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    tasks: List['Task'] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    projects: List['Project'] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    categories: List['Category'] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class Task(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    due_time: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    creator_id: str = Field(default=None, foreign_key="user.id")
    creator: 'User' = Relationship(back_populates="tasks")

    project_id: str = Field(default=None, foreign_key="project.id")
    project: 'Project' = Relationship(back_populates="tasks")

    sub_tasks: List['SubTask'] = Relationship(back_populates="task", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class SubTask(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    task_id: str = Field(default=None, foreign_key="task.id")
    task: 'Task' = Relationship(back_populates="sub_tasks")

    creator_id: str = Field(default=None, foreign_key="user.id")
    creator: 'User' = Relationship(back_populates="tasks")

    created_at: datetime = Field(default=datetime.now(), nullable=False)

class Project(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    description: str = Field(nullable=False)
    is_completed: bool = Field(default=False)
    icon: str 

    creator_id: str = Field(default=None, foreign_key="user.id")
    creator: 'User' = Relationship(back_populates="projects")
    
    tasks: List['Task'] = Relationship(back_populates="project", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    categories: List['Category'] = Relationship(back_populates="projects")

class Category(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    creator_id: str = Field(default=None, foreign_key="user.id")
    creator: 'User' = Relationship(back_populates="categories")

    projects: List['Project'] = Relationship(back_populates="categories")


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
security = HTTPBearer() # <- (4)

@app.get('/')
async def root():
    return {'message': 'Hello World'}

# User sign up endpoint
@app.post('/sign-up', response_model=User)
async def handle_user_signup(user_data, session:Annotated[Session, Depends(get_session)]):
    full_name = f"{user_data['first_name']} {user_data['last_name']}";
    hashed_password = hashed_password(user_data["password"])
    try:
        user = User(
            id=user_data["id"],
            name=full_name,
            username=user_data["username"],
            email=user_data["email_addresses"][0]["email_address"],
            hashed_password=hashed_password,
        )
        session.add(user)
        session.commit()
    except Exception as error:
        print(f"Error inserting user data: {error}")
        raise error


#User update api endpoint
@app.put('/user/update/{user_id}', response_model=User)    
async def handle_user_update(user_data, session:Annotated[Session, Depends(get_session)]):
    full_name = f"{user_data['first_name']} {user_data['last_name']}"
    try:
        user = session.exec(select(User).where(User.id == user_data["id"])).first()
        if user:
            user.name = full_name
            user.username = user_data["username"]
            user.email = user_data["email_addresses"][0]["email_address"]


            session.commit()
        else:
            print("User not found")
    except Exception as error:
        print(f"Error updating user data: {error}")
        raise error


#User delete api endpoint
@app.delete('/user/delete/{user_id}',response_model=User)
async def handle_delete_user(user_data, session:Annotated[Session, Depends(get_session)]):
    try:
        user = session.exec(select(User).where(User.id == user_data["id"])).first()
        if user:
            session.delete(user)
            session.commit()
        else:
            print("User not found")
    except Exception as error:
        print(f"Error deleting user data: {error}")
        raise error
    

@app.post('/category/', response_model=list[Category])
async def create_category(category: Category, session: Annotated[Session, Depends(get_session)]):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category