from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Turbo Template Backend",
    description="A toy FastAPI server with demo endpoints",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to Turbo Template Backend API"}

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

@app.get("/api/items")
async def get_items():
    """Demo endpoint returning a list of items."""
    return [
        {"id": 1, "name": "Item 1", "description": "Description for Item 1"},
        {"id": 2, "name": "Item 2", "description": "Description for Item 2"},
        {"id": 3, "name": "Item 3", "description": "Description for Item 3"},
    ]

@app.get("/api/items/{item_id}")
async def get_item(item_id: int):
    """Demo endpoint returning a specific item by ID."""
    items = {
        1: {"id": 1, "name": "Item 1", "description": "Description for Item 1"},
        2: {"id": 2, "name": "Item 2", "description": "Description for Item 2"},
        3: {"id": 3, "name": "Item 3", "description": "Description for Item 3"},
    }
    
    if item_id not in items:
        return {"error": "Item not found"}
    
    return items[item_id]
