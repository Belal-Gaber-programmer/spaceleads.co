// Central registry of Dream100 prospects.
// Each prospect gets its own Cloudflare Worker subdomain
// (e.g. salah-el-deen.spaceleads-agency.workers.dev). One build serves all;
// the active prospect is resolved at runtime from the hostname (with path/query
// overrides for local dev and previews).

export interface ProspectMeta {
  slug: string;
  name: string;
  title: string;
  description: string;
}

export const PROSPECTS: Record<string, ProspectMeta> = {
  'razan-cheaito': {
    slug: 'razan-cheaito',
    name: 'Razan Cheaito',
    title: 'Custom YouTube Strategy for Razan Cheaito | SpaceLeads',
    description:
      'A personalized 90-day YouTube marketing and personal brand strategy prepared by SpaceLeads for Razan Cheaito.',
  },
  'salah-el-deen': {
    slug: 'salah-el-deen',
    name: 'Salah El Deen',
    title: 'Custom YouTube Strategy for Salah El Deen | SpaceLeads',
    description:
      'A personalized 90-day YouTube marketing and personal brand strategy prepared by SpaceLeads for Salah El Deen.',
  },
};

export const DEFAULT_SLUG = 'razan-cheaito';

/**
 * Resolve which prospect page to render.
 * Priority: ?p=slug  →  first path segment  →  hostname subdomain  →  default.
 */
export function resolveProspectSlug(): string {
  if (typeof window === 'undefined') return DEFAULT_SLUG;
  const { hostname, pathname, search } = window.location;

  const q = new URLSearchParams(search).get('p');
  if (q && PROSPECTS[q]) return q;

  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && PROSPECTS[seg]) return seg;

  const sub = hostname.split('.')[0];
  if (PROSPECTS[sub]) return sub;

  return DEFAULT_SLUG;
}
