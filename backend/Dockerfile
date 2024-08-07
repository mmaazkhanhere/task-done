
# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy the pyproject.toml and poetry.lock files to the container
COPY api/pyproject.toml api/poetry.lock ./

# Install dependencies
RUN poetry install --no-dev

# Copy the rest of the application code to the container
COPY api /app

# Expose the port FastAPI is running on
EXPOSE 8000

# Command to run the application
CMD ["poetry", "run", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
