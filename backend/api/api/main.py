from sqlmodel import SQLModel, create_engine, Session
from fastapi import FastAPI
from api import setting
from contextlib import asynccontextmanager

connection_string: str = str(setting.DATABASE_URL).replace("postgresql","postgresql+psycopg2")

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

@app.get('/')
async def root():
    return {"message": "Hello World"}