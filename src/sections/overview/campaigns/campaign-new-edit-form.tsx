import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { api } from 'backend/trpc/client';
import { useMemo, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import {
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCampaignSchemaType = zod.infer<typeof NewCampaignSchema>;

export const NewCampaignSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  link: schemaHelper.url({ message: { required_error: 'Link is required!' } }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  countries: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  dailyBudget: zod.number().min(10, { message: 'Price should be more than $10.00 daily' }),
});

// ----------------------------------------------------------------------

type Props = {
    currentCampaign?: IProductItem;
};

export function CampaignNewEditForm({ currentCampaign }: Props) {
  const router = useRouter();
  //
  const { mutate: createCampaign, isPending: isCreatingCampaign } = api.user.createCampaign.useMutation();


  const defaultValues = useMemo(
    () => ({
      name: currentCampaign?.name || '',
      description: currentCampaign?.description || '',
      subDescription: currentCampaign?.subDescription || '',
      images: currentCampaign?.images || [],
      //
      code: currentCampaign?.code || '',
      sku: currentCampaign?.sku || '',
      price: currentCampaign?.price || 0,
      quantity: currentCampaign?.quantity || 0,
      priceSale: currentCampaign?.priceSale || 0,
      tags: currentCampaign?.tags || [],
      taxes: currentCampaign?.taxes || 0,
      gender: currentCampaign?.gender || [],
      category: currentCampaign?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentCampaign?.colors || [],
      sizes: currentCampaign?.sizes || [],
      newLabel: currentCampaign?.newLabel || { enabled: false, content: '' },
      saleLabel: currentCampaign?.saleLabel || { enabled: false, content: '' },
    }),
    [currentCampaign]
  );

  const methods = useForm<NewCampaignSchemaType>({
    resolver: zodResolver(NewCampaignSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  

  useEffect(() => {
    if (currentCampaign) {
      reset(defaultValues);
    }
  }, [currentCampaign, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {
    try {
        createCampaign(data, {
            onSuccess: () => {
              reset();
              toast.success(currentCampaign ? 'Update success!' : 'Create success!');
              router.push(paths.dashboard.campaigns.root);
            },
            onError: (error) => {
              console.error('Error creating campaign:', error);
              toast.error('Failed to create campaign. Please try again.');
            },
          });
    } catch (error) {
      console.error(error);
    }
  });

  const renderName = (
    <Card>
      <CardHeader title="Basic Information" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>

        <Field.Text name="name" label="Campaign name" />
      </Stack>  
    </Card>
  );

  const renderCampaignDetails = (
    <Card>
      <CardHeader
        title="Details"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1}>
            <Box>
            <Typography variant="subtitle2">URL Link</Typography>
            <Typography variant="caption" color="text.secondary">Where do we take user to when they click on the ad? </Typography>
            <Typography variant="caption" color="text.secondary">Can be a purchase page or a landing page for your service, apps etc. </Typography>
            </Box>
          <Field.Text name="link" label="Product/Service link" />
        </Stack>

        <Stack spacing={1}>
            <Box>
            <Typography variant="subtitle2">Item description</Typography>
            <Typography variant="caption" color="text.secondary">What&apos;s your ad about? Write something that will help our AI understand your ad.</Typography>
            </Box>
        <Field.Editor name="description" sx={{ maxHeight: 480 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderRegion = (
    <Card>
    <CardHeader title="Regions" subheader="Select countries where your campaign will go live" sx={{ mb: 3 }} />

    <Divider />

    <Stack spacing={3} sx={{ p: 3 }}>
          <Typography variant="subtitle2">Countries</Typography>
          <Field.CountrySelect multiple name="countries" placeholder="Choose countries" countryCodes={['US', 'GB']} />
        </Stack>
  </Card>
  )

  const renderPricing = (
    <Card>
      <CardHeader title="Budget" subheader="Set a limit for your campaign" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>

        <Field.Text
          name="dailyBudget"
          label="Daily budget"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap" justifyContent="flex-end">

      <LoadingButton type="submit" variant="contained" size="large" loading={isCreatingCampaign}>
        {!currentCampaign ? 'Create campaign' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderName}

        {renderCampaignDetails}

        {renderRegion}
        {renderPricing}

        {renderActions}
      </Stack>
    </Form>
  );
}
