from typing import Any, Dict, List, Optional

import httpx
from pydantic import BaseModel, ValidationError


class Club(BaseModel):
    id: str
    name: str
    description: Optional[str] = None


class ClubcraftClient:
    def __init__(self, base_url: str, token: Optional[str] = None, *, timeout: Optional[float] = 10.0) -> None:
        self.base_url = base_url.rstrip('/')
        self.token = token
        self.timeout = timeout
        self._client = httpx.AsyncClient(base_url=self.base_url, timeout=self.timeout)

    async def close(self) -> None:
        await self._client.aclose()

    def set_token(self, token: str) -> None:
        self.token = token

    async def _request(self, method: str, path: str, json: Optional[Dict[str, Any]] = None) -> Any:
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        response = await self._client.request(method, path, json=json, headers=headers)
        response.raise_for_status()
        return response.json()

    async def list_clubs(self) -> List[Club]:
        data = await self._request('GET', '/clubs')
        try:
            clubs = [Club(**item) for item in data.get('data', [])]
        except ValidationError as exc:
            raise ValueError('Invalid club payload') from exc
        return clubs

    async def create_club(self, name: str, description: Optional[str] = None) -> Club:
        payload = await self._request('POST', '/clubs', json={'name': name, 'description': description})
        try:
            return Club(**payload)
        except ValidationError as exc:
            raise ValueError('Invalid club response') from exc
