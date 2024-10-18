import { CONFIG } from 'src/config-global';

import { DashboardView } from 'src/sections/overview/dashboard/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <DashboardView />;
}
