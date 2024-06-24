

from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import List

from task import Task
from project import Project
from category import Category

class User(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    name: str = Field(nullable=False)
    username: str = Field(unique=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    tasks: List["Task"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade":"all, delete-orphan"})
    projects: List["Project"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade":"all, delete-orphan"})

    categories: List["Category"] = Relationship(back_populates="creator", sa_relationship_kwargs={"cascade":"all, delete-orphan"})
