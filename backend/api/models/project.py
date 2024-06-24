import uuid
from datetime import datetime
from typing import List
from sqlmodel import SQLModel, Field, Relationship
from user import User
from task import Task
from category import Category

class Project(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    description: str = Field(nullable=False)
    is_completed: bool = Field(default=False)

    creator_id: str = Field(default=None, foreign_key=User.id)
    creator: User = Relationship(back_populates="projects")
    
    tasks: List["Task"] = Relationship(back_populates="project", sa_relationship_kwargs={"cascade":"all, delete-orphan"})

    categories: List["Category"] = Relationship(back_populates="projects")