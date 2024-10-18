'use client';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import {
  _dashboardCampaigns,
} from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { DashboardStatWidget } from '../dashboard-stat-widget';
import { DashboardSimpleChart } from '../dashboard-simple-chart';
import { DashboardCampaignList } from '../dashboard-campaign-list';

// ----------------------------------------------------------------------

export function DashboardView() {
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="lg">
      <Grid container spacing={3}>
      <Grid xs={12} md={4}>
          <DashboardStatWidget
            title="Total Impressions"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DashboardStatWidget
            title="Total Clicks"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <DashboardStatWidget
            title="Total Spending"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
        <DashboardSimpleChart
            title="Impressions"
            chart={{
              series: [
                {
                  name: 'Weekly',
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: 'Monthly',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Yearly',
                  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
        <DashboardSimpleChart
            title="Clicks"
            chart={{
              series: [
                {
                  name: 'Weekly',
                  categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                  data: [{ data: [10, 41, 35, 151, 49] }],
                },
                {
                  name: 'Monthly',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                  data: [{ data: [83, 112, 119, 88, 103, 112, 114, 108, 93] }],
                },
                {
                  name: 'Yearly',
                  categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
                  data: [{ data: [24, 72, 64, 96, 76, 41] }],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={12}>
        <DashboardCampaignList
            title="Campaigns"
            tableData={_dashboardCampaigns}
            headLabel={[
              { id: 'campaignName', label: 'Campaign Name' },
              { id: 'date', label: 'Date' },
              { id: 'spending', label: 'Spending' },
              { id: 'impressions', label: 'Impressions' },
              { id: 'clicks', label: 'Clicks' },
              { id: 'ctr', label: 'CTR (%)' },
              { id: 'cpc', label: 'CPC' },
              { id: 'countries', label: 'Countries' },
              { id: 'status', label: 'Status' },
              { id: 'actions', label: 'Actions' },
            ]}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
