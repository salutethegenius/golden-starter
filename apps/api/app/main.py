from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import example

app = FastAPI(title="Golden Starter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(example.router)


@app.get("/health")
def health() -> dict:
    """For Docker / load balancer checks."""
    return {"status": "ok"}
