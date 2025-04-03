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
yarn dev:init
yarn lint
yarn typecheck
yarn format:write

# Run server
yarn dev

# Run tests
yarn test
```

## Run scripts

```bash
# Note that running npm scripts requires the "--" to separate the arguments that
# are passed into npm vs those passed into the script.
yarn script app/scripts/<script-name>.py -- <args-for-script>
```

## API Endpoints

- `GET /`: Root endpoint with welcome message
- `GET /health`: Health check endpoint
- `GET /api/items`: Get a list of demo items
- `GET /api/items/{item_id}`: Get a specific item by ID
