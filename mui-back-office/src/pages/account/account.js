// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from './account-profile';
import {AccountProfileDetails} from './account-profile-details';
import Header from '../../components/Header';

const Account = () => (
  <Box m="20px">
    <Header
        title="ACCOUNT"
        subtitle="Profile of Excellent Admin"
      />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </Box>
);

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Account;
