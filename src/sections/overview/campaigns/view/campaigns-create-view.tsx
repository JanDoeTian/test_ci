'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CampaignNewEditForm } from '../campaign-new-edit-form';

// ----------------------------------------------------------------------

export function CreateCampaignView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new campaign"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Campaigns', href: paths.dashboard.campaigns.root },
          { name: 'New Campaign' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CampaignNewEditForm />
    </DashboardContent>
  );
}
