import pRetry, { Options } from 'p-retry';

export async function withRetry<T>(fn: () => Promise<T>, options: Options = {}) {
  return await pRetry(fn, {
    retries: 3,
    factor: 2,
    minTimeout: 500,
    ...options
  });
}
