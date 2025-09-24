import { env } from '../env';
import { withRetry } from './retry';

export interface CrunchbaseOrganization {
  name: string;
  permalink: string;
  primaryRole: string;
}

export const crunchbaseService = {
  async searchOrganizations(query: string): Promise<CrunchbaseOrganization[]> {
    return withRetry(async () => {
      const response = await fetch('https://api.crunchbase.com/api/v4/searches/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cb-User-Key': env.CRUNCHBASE_API_KEY ?? ''
        },
        body: JSON.stringify({ query: [{ field_id: 'organization_name', operator_id: 'contains', values: [query] }] })
      });

      if (!response.ok) {
        throw new Error(`Crunchbase API error: ${response.statusText}`);
      }
      const data = await response.json();
      return data.entities?.map((entity: any) => ({
        name: entity.properties?.name ?? 'Unknown',
        permalink: entity.properties?.permalink,
        primaryRole: entity.properties?.primary_role ?? 'unknown'
      })) ?? [];
    });
  }
};
