import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from user import User
from task import Task

class SubTask(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    task_id: str = Field(default=None, foreign_key=Task.id)
    task: Task = Relationship(back_populates="subtasks")
    creator: User = Relationship(back_populates="projects")
    creator_id: str = Field(default=None, foreign_key=User.id)
    created_at: datetime = Field(default=datetime.now(), nullable=False)