'use client';


import { SupabaseVerifyView } from 'src/sections/auth/supabase';

// ----------------------------------------------------------------------

import { useEffect } from 'react';
import { api } from 'backend/trpc/client';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

export default function Page() {
  const postVerify = api.auth.postVerify.useMutation();
  const router = useRouter();
  useEffect(() => {
    const mutatePostVerify = async () => {
      await postVerify.mutate();
      router.replace(paths.dashboard.root);
    };
    mutatePostVerify();
  });

  return <SupabaseVerifyView />;
}
