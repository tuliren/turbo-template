"""
Example script that imports code from the backend module.
This script can be used as a template for one-off tasks.
"""
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from app.main import app


def main():
    """
    Example function that uses the FastAPI app instance.
    This demonstrates how to import and use code from the module.
    """
    print(f"FastAPI App Title: {app.title}")
    print(f"FastAPI App Version: {app.version}")
    print("Available routes:")
    for route in app.routes:
        print(f"  {route.path} [{', '.join(route.methods)}]")


if __name__ == "__main__":
    main()
