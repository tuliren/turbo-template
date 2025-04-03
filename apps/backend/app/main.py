from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.items.router import router as items_router

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

app.include_router(items_router)


@app.get("/")
async def root():
    """Root endpoint returning a welcome message."""
    return {"message": "Welcome to Turbo Template Backend API"}


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}
