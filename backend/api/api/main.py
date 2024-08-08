
from typing import Annotated, List, Optional, Union

import logging
import uuid
from datetime import datetime
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from pydantic import ValidationError, EmailStr, BaseModel


from sqlmodel import SQLModel, create_engine, Session, Field, Relationship, select, ARRAY
from fastapi import FastAPI, Depends, Request, Response, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy.types as types

from .setting import DATABASE_URL

load_dotenv()

# User Model
class User(SQLModel, table=True):
    id: str = Field (primary_key=True)
    name: str = Field(nullable=False)
    username: str = Field(unique=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)
    
    tasks: List["Task"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    sub_tasks: List["SubTask"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"}) 
    projects: List["Project"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    categories: List["Category"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

# Task Model
class Task(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    due_date: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False, nullable=False)
    completion_date: Union[datetime, None] = Field(default=None, nullable=True)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="tasks")
    
    project_id: Optional[str] = Field(default=None, foreign_key="project.id")
    project: Optional["Project"] = Relationship(back_populates="tasks")
    
    sub_tasks: List["SubTask"] = Relationship(back_populates="task", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

# SubTask Model
class SubTask(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    due_date: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False, nullable=False)
    completion_date: Union[datetime, None] = Field(default=None, nullable=True)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    task_id: str = Field(foreign_key="task.id", nullable=False)
    task: "Task" = Relationship(back_populates="sub_tasks")

    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="sub_tasks")

# Project Model
class Project(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    description: str = Field(nullable=False)
    due_date: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False)
    completion_date: Union[datetime, None] = Field(default=None, nullable=True)
    icon: str = Field(default="")
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="projects")
    
    tasks: List["Task"] = Relationship(back_populates="project", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    
    category: "Category" = Relationship(back_populates="projects")
    category_id: str = Field(foreign_key="category.id", nullable=False)
    
# Category Model
class Category(SQLModel, table=True):
    id: str = Field(primary_key=True)
    title: str = Field(nullable=False, index=True)
    created_at: datetime = Field(default=datetime.now, nullable=False)
    
    creator_id: str = Field(foreign_key="user.id", nullable=False)
    creator: "User" = Relationship(back_populates="categories")
    
    projects: List["Project"] = Relationship(back_populates="category", sa_relationship_kwargs={'cascade':'all, delete-orphan'})

class UserResponse(BaseModel):
    id: str
    name: str
    username: str
    email: str
    created_at: datetime

class UserUpdate(BaseModel):
    name: Optional[str]
    username: Optional[str]
    email: Optional[EmailStr]

class EditProject(BaseModel):
    title: str
    description: str
    icon: str
    category_id: str
    due_date: datetime

class ProjectData(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    due_date: datetime
    category_id: str
    creator_id: str

class SubTaskData(BaseModel):
    id: str
    title: str
    priority: str
    due_date: datetime
    creator_id: str
    task_id: str

class SubTaskResponse(BaseModel):
    id: str
    title: str
    priority: str
    due_date: datetime
    completion_date: Union[datetime | None]
    is_completed: bool
    created_at: datetime
    task_id: str
    creator_id: str
    creator: 'UserResponse'

class TaskResponse(BaseModel):
    id: str
    title: str
    priority: str
    due_date: datetime
    completion_date: Union[datetime | None]
    is_completed: bool
    
    created_at: datetime

    creator_id: str
    creator: UserResponse

    sub_tasks: List['SubTaskResponse']

class SubTaskComplete(BaseModel):
    is_complete: bool

class ProjectTaskResponse(BaseModel):
    id: str
    title: str
    priority: str
    due_date: datetime
    is_completed: bool
    completion_date: Union[datetime | None]
    
    created_at: datetime

    creator_id: str
    creator: UserResponse

    project_id: str

    sub_tasks: List['SubTaskResponse']

class TaskData(BaseModel):
    id: str
    title: str
    due_date: datetime
    priority: str
    creator_id:str

class ProjectTaskData(BaseModel):
    id: str
    title: str
    priority: str
    due_date: datetime
    project_id: str
    creator_id: str

class TaskEditData(BaseModel):
    title: str
    priority: str
    due_date: datetime

class TaskComplete(BaseModel):
    is_complete: bool

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    due_date: datetime
    completion_date: Union[datetime, None]
    is_completed: bool
    
    created_at: datetime

    creator_id: str
    creator: UserResponse

    category_id: str

    tasks: List['ProjectTaskResponse']

class  CreateCategory(BaseModel):
    id: str
    title: str
    userId: str

class CategoryResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    creator_id: str
    creator: UserResponse
    projects: list[ProjectResponse]
    
class EditCategory(BaseModel):
    title: str

ProjectResponse.model_rebuild()  # Update forward references
ProjectTaskResponse.model_rebuild()  # Update forward references
SubTaskResponse.model_rebuild()  # Update forward references

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

@app.get('/api')
async def root():
    return {'message': 'Hello World'}

# User sign up endpoint
@app.post("/api/sign-up", response_model=User)
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

# get user data
@app.get('/api/user/{user_id}', response_model=UserResponse)
async def get_user_data(user_id: str, session: Session = Depends(get_session)):
    try:
        user = session.exec(select(User).where(User.id == user_id)).first()
        if user:
            return user
        else:
            logger.error("User not found")
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        logger.error(f"Error getting user data: {e}")
        raise HTTPException(status_code=500, detail=str(e))

#User update api endpoint
@app.patch('/api/user/update/{user_id}', response_model=User)
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
@app.delete('/api/user/delete/{user_id}', response_model=User)
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
    

# Create a category api endpoint
@app.post('/api/category', response_model=Category)
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
        logger.error(f"\nError creating category: {e}\n")
        raise HTTPException(status_code=500, detail=str(e))
    

# Get the list of all categories
@app.get('/api/category/all', response_model=List[CategoryResponse])
async def get_all_categories(session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        category_list = session.exec(select(Category).where(Category.creator_id == x_user_id)).all()
        return category_list
    except Exception as e:
        logger.error(f"\nError getting category list: {e}\n")
        raise HTTPException(status_code=500, detail=str(e))
    

# Get specific category data
@app.get('/api/category/{category_id}', response_model=CategoryResponse)
async def get_category(category_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        category = session.exec(
            select(Category).where((Category.id == category_id) & (Category.creator_id == x_user_id))
        ).first()
        if category:
            return category
        else:
            raise HTTPException(status_code=404, detail="Category not found")
    except Exception as e:
        logger.error(f"\nError getting category: {e}\n")
        raise HTTPException(status_code=500, detail=str(e))


# Edit category api endpoint
@app.patch('/api/category/edit/{category_id}', response_model=Category)
async def handle_edit_category(
    category_id: str, 
    category_data: EditCategory,
    session: Session = Depends(get_session), 
    x_user_id: str = Header(...)
):
    try:
        # Check if the category to be edited exists and belongs to the user
        category = session.exec(
            select(Category).where((Category.id == category_id) & (Category.creator_id == x_user_id))
        ).first()
        
        if category:
            # Check if a different category with the same title already exists for the user
            existing_category = session.exec(
                select(Category).where(
                    (Category.creator_id == x_user_id) & (Category.title == category_data.title) & (Category.id != category_id)
                )
            ).first()
            
            if existing_category:
                logger.error("Category title already exists")
                raise HTTPException(status_code=409, detail="Category title already exists")
            
            # Update the category title
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

# delete category api endpoint 
@app.delete("/api/category/delete/{category_id}", response_model = Category)
async def handle_delete_category(category_id: str, session:Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        category = session.exec(
            select(Category).where((Category.id == category_id) & (Category.creator_id == x_user_id))
        ).first()
        if category:
            session.delete(category)
            session.commit()
            return category
        else:
            logger.error("Category not found")
            raise HTTPException(status_code = 400, detail = "Category not found")
    except Exception as e:
        logger.error(f"Error deleting category: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# create project api endpoint
@app.post('/api/project', response_model=Project)
async def handle_create_project(project_data: ProjectData, session: Annotated[Session, Depends(get_session)]):
    try:
        logger.info(f"Received project data: {project_data.model_dump_json()}")
        project = Project(
            id = project_data.id,
            title = project_data.title,
            description = project_data.description,
            icon = project_data.icon,
            due_date = project_data.due_date,
            created_at = datetime.now(),
            creator_id = project_data.creator_id,
            category_id = project_data.category_id,
        )
        session.add(project)
        session.commit()
        session.refresh(project)
        return project
    
    except Exception as e:
        logger.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# get all projects
@app.get('/api/project/all', response_model=List[ProjectResponse])
async def get_all_projects(session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        project_list = session.exec(select(Project).where(Project.creator_id == x_user_id)).all()
        return project_list
    except Exception as e:
        logger.error(f"Error getting project list: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# get project
@app.get('/api/project/{project_id}', response_model=ProjectResponse)
async def get_project(project_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        project = session.exec(
            select(Project).where((Project.id == project_id) & (Project.creator_id == x_user_id))
        ).first()
        if project:
            return project
        else:
            raise HTTPException(status_code=404, detail="Project not found")
    except Exception as e:
        logger.error(f"\nError getting project: {e}\n")
        raise HTTPException(status_code=500, detail=str(e))

# edit project
@app.patch('/api/project/edit/{project_id}', response_model=Project)
async def edit_project(project_id: str, project_data:EditProject, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        project = session.exec(
            select(Project).where((Project.id == project_id) & (Project.creator_id == x_user_id))
        ).first()

        if project:
            project.title = project_data.title
            project.description = project_data.description
            project.icon = project_data.icon
            project.category_id = project_data.category_id
            project.due_date = project_data.due_date
            session.commit()
            session.refresh(project)
            return project

    except Exception as e:
        logger.error(f"Error getting project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# delete project
@app.delete("/api/project/delete/{project_id}", response_model = Project)
async def handle_delete_project(project_id: str, session:Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        project = session.exec(
            select(Project).where((Project.id == project_id) & (Project.creator_id == x_user_id))
        ).first()
        if project:
            session.delete(project)
            session.commit()
            return project
        else:
            logger.error("Project not found")
            raise HTTPException(status_code = 400, detail = "Project not found")
    except Exception as e:
        logger.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# create task
@app.post('/api/task', response_model=Task)
async def create_task(task_data: TaskData, session: Annotated[Session, Depends(get_session)]):
    try:
        task = Task(
            id = task_data.id,
            title = task_data.title,
            priority= task_data.priority,
            due_date = task_data.due_date,
            creator_id = task_data.creator_id,
            created_at= datetime.now()
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        return task

    except Exception as e:
        logger.error(f"Error creating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# get all tasks
@app.get('/api/task/all', response_model=List[TaskResponse])
async def get_all_tasks(session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task_list = session.exec(select(Task).where(Task.creator_id == x_user_id)).all()
        return task_list
    except Exception as e:
        logger.error(f"Error getting task list: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# get all simple tasks
@app.get('/api/task/simple/all', response_model=List[TaskResponse])
async def get_all_simple_tasks(session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        tasks_list = session.exec(select(Task).where((Task.creator_id == x_user_id) & (Task.project_id == None)))
        if tasks_list:
            return tasks_list
        else:
            return []
    except Exception as e:
        logger.error(f"Error getting task list: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# edit task
@app.patch('/api/task/edit/{task_id}', response_model=Task)
async def edit_task(task_id: str, task_data: TaskEditData, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id) & (Task.creator_id == x_user_id) & (Task.project_id == None))).first()
        if task:
            task.title  = task_data.title
            task.priority = task_data.priority
            task.due_date = task_data.due_date
            session.commit()
            session.refresh(task)
            return task
        else:
            raise HTTPException(status_code=400, detail="Task not found")
    except Exception as e:
        logger.error(f"Error getting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# delete task
@app.delete('/api/task/delete/{task_id}', response_model=Task)
async def delete_task(task_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id) & (Task.creator_id == x_user_id) & (Task.project_id == None))).first()
        if task:
            session.delete(task)
            session.commit()
            return task
        else:
            raise HTTPException(status_code=400, detail="Task not found")
    except Exception as e:
        logger.error(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# task completion
@app.patch('/api/task/complete/{task_id}')
async def task_completion(task_id: str, recieved_date: TaskComplete, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id) & (Task.creator_id == x_user_id) & (Task.project_id == None))).first()
        if task:
            incomplete_sub_tasks = session.exec(select(SubTask).where((SubTask.task_id == task.id) & (SubTask.is_completed == False))).all()
            if incomplete_sub_tasks:
                raise HTTPException(status_code=409, detail="Sub-tasks are not completed")
            else:
                task.is_completed = recieved_date.is_complete
                if task.is_completed:
                    completion_date_value = datetime.now()
                else:
                    completion_date_value = None
                task.completion_date = completion_date_value
                session.commit()
                session.refresh(task)
                return task
        else:
            raise HTTPException(status_code=400, detail="Task not found")
    except Exception as e:
        logger.error(f"Error completing task: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# create project task
@app.post('/api/project/task', response_model=Task)
async def create_project_task(task_data: ProjectTaskData, session: Annotated[Session, Depends(get_session)]):
    try:
        task = Task(
            id = task_data.id,
            title = task_data.title,
            priority= task_data.priority,
            due_date = task_data.due_date,
            project_id = task_data.project_id,
            creator_id = task_data.creator_id,
            created_at= datetime.now()
        )
        session.add(task)
        session.commit()
        session.refresh(task)
        return task
    
    except Exception as e:
        logger.error(f"Error creating task: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# get all project tasks
@app.get('/api/project/task/all/{project_id}', response_model=List[ProjectTaskResponse])
async def get_all_project_tasks(project_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        if not project_id or not x_user_id:
            raise HTTPException(status_code=400, detail="Project and User ID are required")

        task_list = session.exec(
            select(Task).where((Task.project_id == project_id) & (Task.creator_id == x_user_id))
        ).all()
        if not task_list:
            return []
        else:
            return task_list
    except Exception as e:
        logger.error(f"Error getting project list: {e}")
        raise HTTPException(status_code=500, detail=str(e))

#edit project tasks
@app.patch('/api/project/task/edit/{task_id}', response_model=Task)
async def edit_project_task(task_id: str, task_data: TaskEditData,session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id) & (Task.creator_id == x_user_id))).first()
        if task:
            task.title  = task_data.title
            task.priority = task_data.priority
            task.due_date = task_data.due_date
            session.commit()
            session.refresh(task)
            return task
        
    except Exception as e:
        logger.error(f"Error getting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# project task complete api
@app.patch('/api/project/task/complete/{task_id}')
async def project_task_completion(task_id: str, recieved_data: TaskComplete ,session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id) & (Task.creator_id == x_user_id))).first()
        if task:
            incomplete_sub_tasks = session.exec(select(SubTask).where((SubTask.task_id == task.id) & (SubTask.is_completed == False))).all()
            if incomplete_sub_tasks:
                raise HTTPException(status_code=409, detail="Sub-tasks are not completed")
            else:
                task.is_completed = recieved_data.is_complete
                if task.is_completed:
                    completion_date_value = datetime.now()
                else:
                    completion_date_value = None
                task.completion_date = completion_date_value
                session.commit()
                session.refresh(task)
                return task
        else:
            raise HTTPException(status_code=400, detail="Task not found")
    except Exception as e:
        logger.error(f"Error completing task: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# task delete api
@app.delete('/api/project/task/delete/{task_id}', response_model=Task)
async def delete_project_task(task_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        task = session.exec(select(Task).where((Task.id == task_id)&(Task.creator_id == x_user_id))).first()
        if task:
            session.delete(task)
            session.commit()
            return task
        else:
            raise HTTPException(status_code=400, detail="Task not found")
    except Exception as e:
        logger.error(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

# add sub task
@app.post('/api/subtask', response_model=SubTask)
async def create_subtask(task_data: SubTaskData, session : Annotated[Session, Depends(get_session)]):
    
    parent_task = session.exec(select(Task).where((Task.id == task_data.task_id) & (Task.creator_id == task_data.creator_id))).first()
    try:
        if parent_task is None:
            raise HTTPException(status_code=400, detail="Parent task not found")
        else:
            if parent_task.is_completed:
                parent_task.is_completed = False

            sub_task = SubTask(
                id = task_data.id,
                title = task_data.title,\
                priority = task_data.priority,
                due_date = task_data.due_date,
                created_at = datetime.now(),
                task_id = task_data.task_id,
                creator_id = task_data.creator_id
            )

            session.add(sub_task)
            session.commit()
            session.refresh(sub_task)
            return sub_task
    
    except Exception as e:
        logger.error(f"Error creating sub task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# get all sub tasks
@app.get('/api/subtask/all/{task_id}', response_model=List[SubTaskResponse])
async def get_all_subtasks(task_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        sub_task_list = session.exec(
            select(SubTask)
            .where((SubTask.task_id == task_id) & (SubTask.creator_id == x_user_id))
            .order_by(SubTask.priority)
        ).all()
        if sub_task_list:
            return sub_task_list
        else:
            return []
    except Exception as e:
        logger.error(f"Error getting sub task list: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# sub task completion
@app.patch('/api/subtask/complete/{subtask_id}')
async def subtask_completion(subtask_id: str, recieved_data: SubTaskComplete, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        sub_task = session.exec(
            select(SubTask).where((SubTask.id == subtask_id)&(SubTask.creator_id == x_user_id))
        ).first()
        if sub_task:
            sub_task.is_completed = recieved_data.is_complete
            if recieved_data.is_complete:
                sub_task.completion_date = datetime.now()
            else:
                sub_task.completion_date = None

            session.commit()
            session.refresh(sub_task)
            return sub_task
        else:
            raise HTTPException(status_code=400, detail="Sub-task not found")
    
    except Exception as e:
        logger.error(f"Error completing sub task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# sub task delete
@app.delete('/api/subtask/delete/{subtask_id}', response_model=SubTask)
async def delete_subtask(subtask_id: str, session: Session = Depends(get_session), x_user_id: str = Header(...)):
    try:
        sub_task = session.exec(select(SubTask).where((SubTask.id == subtask_id)&(SubTask.creator_id == x_user_id))).first()
        if sub_task:
            session.delete(sub_task)
            session.commit()
            return sub_task
        else:
            raise HTTPException(status_code=400, detail="Sub-task not found")
    except Exception as e:
        logger.error(f"Error deleting sub task: {e}")
        raise HTTPException(status_code=500, detail=str(e))


