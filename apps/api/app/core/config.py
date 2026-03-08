from pydantic_settings import BaseSettings


def _default_origins() -> list[str]:
    return ["http://localhost:3000", "http://localhost:3001"]


class Settings(BaseSettings):
    """Load from environment. Add keys as needed (e.g. OPENAI_API_KEY, QDRANT_URL)."""

    # Comma-separated list, or default to common dev ports
    frontend_origin: str = "http://localhost:3000"
    # Allow multiple origins (e.g. "http://localhost:3000,http://localhost:3001")
    cors_origins: str | None = None

    class Config:
        env_file = ".env"
        extra = "ignore"

    @property
    def cors_origin_list(self) -> list[str]:
        if self.cors_origins:
            return [o.strip() for o in self.cors_origins.split(",") if o.strip()]
        return _default_origins()


settings = Settings()
