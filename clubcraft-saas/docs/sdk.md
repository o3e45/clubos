# SDK Usage

## JavaScript SDK
Install via pnpm:

```bash
pnpm add @clubcraft/sdk
```

Usage:

```ts
import { ClubcraftClient } from '@clubcraft/sdk';

const client = new ClubcraftClient({
  baseUrl: 'http://localhost:4000',
  token: 'your-jwt-token'
});

const clubs = await client.clubs.list();
```

## Python SDK
Install locally:

```bash
pip install -e sdk/python
```

Usage:

```python
from clubcraft import ClubcraftClient

client = ClubcraftClient(base_url="http://localhost:4000", token="your-jwt-token")
clubs = client.clubs.list()
```

Both SDKs share the same REST endpoints described in `docs/api.md`.
