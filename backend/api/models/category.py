import uuid
from datetime import datetime
from typing import List
from sqlmodel import SQLModel, Field, Relationship

from user import User
from project import Project

class Category(SQLModel, table=True):
    id: str = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str = Field(nullable=False, index=True)
    created_at: datetime = Field(default=datetime.now(), nullable=False)

    creator_id: str = Field(default=None, foreign_key=User.id)
    creator: User = Relationship(back_populates="categories")

    project: List["Project"] = Relationship(back_populates="categories")