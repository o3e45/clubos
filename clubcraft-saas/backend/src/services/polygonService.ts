import { env } from '../env';
import { withRetry } from './retry';

export interface MarketQuote {
  symbol: string;
  price: number;
  updatedAt: string;
}

export const polygonService = {
  async getLatestQuote(symbol: string): Promise<MarketQuote> {
    return withRetry(async () => {
      const response = await fetch(`https://api.polygon.io/v2/last/trade/${symbol}?apiKey=${env.POLYGON_API_KEY}`);
      if (!response.ok) {
        throw new Error(`Polygon API error: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        symbol,
        price: data.last?.price ?? 0,
        updatedAt: data.last?.timestamp ?? new Date().toISOString()
      };
    });
  }
};
