import { Suspense } from 'react';
import { TRPCProvider } from 'backend/trpc/TRPCProvider';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { AuthGuard } from 'src/auth/guard';

import Loading from './loading';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard>
      <TRPCProvider>
        <Suspense fallback={<Loading />}>
          <DashboardLayout>{children}</DashboardLayout>
        </Suspense>
      </TRPCProvider>
    </AuthGuard>
  );
}
