import { createApp } from '../src/server';
import type { FastifyInstance } from 'fastify';

describe('Clubs routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://test:test@localhost:5432/test';
    process.env.REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret-123456789';
    process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? 'sk_test_123';

    app = await createApp();

    app.prisma.club.findMany = jest.fn().mockResolvedValue([
      { id: '1', name: 'Alpha', description: null, createdAt: new Date(), updatedAt: new Date() }
    ]) as any;
    app.prisma.club.count = jest.fn().mockResolvedValue(1) as any;
    app.prisma.club.create = jest.fn().mockImplementation(async ({ data }) => ({
      id: 'new-club',
      name: data.name,
      description: data.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    })) as any;
    app.prisma.club.findUnique = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Alpha',
      description: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }) as any;
    app.prisma.club.update = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Alpha Updated',
      description: 'Updated',
      createdAt: new Date(),
      updatedAt: new Date()
    }) as any;
    app.prisma.club.delete = jest.fn().mockResolvedValue({ id: '1' }) as any;
  });

  afterAll(async () => {
    await app.close();
  });

  it('lists clubs', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/clubs',
      headers: { authorization: `Bearer ${app.jwt.sign({ userId: '1', role: 'Viewer' })}` }
    });

    expect(response.statusCode).toBe(200);
    const payload = response.json();
    expect(payload.data).toHaveLength(1);
    expect(payload.meta.total).toBe(1);
  });

  it('creates club', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/clubs',
      payload: { name: 'Beta Club' },
      headers: { authorization: `Bearer ${app.jwt.sign({ userId: '1', role: 'Owner' })}` }
    });

    expect(response.statusCode).toBe(201);
    expect(response.json().name).toBe('Beta Club');
  });
});
