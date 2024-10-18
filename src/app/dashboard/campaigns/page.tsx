import { CONFIG } from 'src/config-global';

import { CampaignsListView } from 'src/sections/overview/campaigns/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Campaigns | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CampaignsListView />;
}
