import { withRetry } from './retry';

export interface CampaignInsight {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  spend: number;
}

export const googleAdsService = {
  async listCampaignInsights(customerId: string): Promise<CampaignInsight[]> {
    return withRetry(async () => {
      // Placeholder for Google Ads API client
      return [
        {
          id: 'cmp-1',
          name: `Sample Campaign for ${customerId}`,
          impressions: 12000,
          clicks: 420,
          spend: 860.5
        }
      ];
    });
  }
};
