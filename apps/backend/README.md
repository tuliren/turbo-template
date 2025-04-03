# Backend API

A toy FastAPI server with demo endpoints for the Turbo Template monorepo.

## Features

- FastAPI-based REST API
- Demo endpoints for testing
- Integrated with Turbo monorepo
- Configured with best practices for Python development:
  - Linting with flake8 and pylint
  - Type checking with mypy
  - Formatting with black and isort
  - Testing with pytest

## Development

```bash
# Install dependencies
poetry install

# Run development server
yarn dev
# or directly with poetry
poetry run uvicorn app.main:app --reload

# Run linting
yarn lint
# or directly with poetry
poetry run flake8 app && poetry run pylint app

# Run type checking
yarn typecheck
# or directly with poetry
poetry run mypy app

# Run formatting
yarn format
# or directly with poetry
poetry run black app && poetry run isort app

# Run tests
yarn test
# or directly with poetry
poetry run pytest
```

## API Endpoints

- `GET /`: Root endpoint with welcome message
- `GET /health`: Health check endpoint
- `GET /api/items`: Get a list of demo items
- `GET /api/items/{item_id}`: Get a specific item by ID
