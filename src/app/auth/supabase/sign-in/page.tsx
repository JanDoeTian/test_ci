import { CONFIG } from 'src/config-global';

import { SupabaseSignInView } from 'src/sections/auth/supabase';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Adgent advertiser dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <SupabaseSignInView />;
}
