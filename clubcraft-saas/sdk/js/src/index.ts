import { z } from 'zod';

const clubSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional()
});

type Club = z.infer<typeof clubSchema>;

export interface ClubcraftClientOptions {
  baseUrl: string;
  token?: string;
  fetchImpl?: typeof fetch;
}

export class ClubcraftClient {
  private readonly baseUrl: string;
  private token?: string;
  private readonly fetchImpl: typeof fetch;

  constructor(options: ClubcraftClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.token = options.token;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(path: string, init?: RequestInit) {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...init?.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  }

  clubs = {
    list: async (): Promise<Club[]> => {
      const result = await this.request<{ data: unknown }>('/clubs');
      const parsed = z.object({ data: z.array(clubSchema) }).parse(result);
      return parsed.data;
    },
    create: async (input: { name: string; description?: string }): Promise<Club> => {
      const result = await this.request<unknown>('/clubs', {
        method: 'POST',
        body: JSON.stringify(input)
      });
      return clubSchema.parse(result);
    }
  };
}
