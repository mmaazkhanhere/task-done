
import uuid
from datetime import datetime
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: str = Field(default=None, primary_key=True)
    name: str = Field(nullable=False)
    username: str = Field(unique=True, nullable=False)
    email: str = Field(unique=True, nullable=False)
    created_at: datetime = Field(default=datetime.now(), nullable=False)
