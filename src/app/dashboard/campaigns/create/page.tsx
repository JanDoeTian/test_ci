import { CONFIG } from 'src/config-global';

import { CreateCampaignView } from 'src/sections/overview/campaigns/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create Campaign | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CreateCampaignView />;
}
