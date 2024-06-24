import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import List

from user import User
from project import Project
from sub_task import SubTask


class Task(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False)
    description: str = Field(nullable=False)
    priority: str = Field(nullable=False)
    due_time: datetime = Field(nullable=False)
    is_completed: bool = Field(default=False, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    creator_id: str = Field(default=None, foreign_key=User.id)
    creator: User = Relationship(back_populates="tasks")

    project_id: str = Field(default=None, foreign_key=Project.id)
    project: Project = Relationship(back_populates="tasks")

    sub_tasks: List["SubTask"] = Relationship(back_populates="task", sa_relationship_kwargs={"cascade":"all, delete-orphan"})
