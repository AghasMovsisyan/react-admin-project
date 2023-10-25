import * as React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import { ImageField } from 'react-admin';

export const Dashboard = () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      <ImageField
        source="imageURL"
        record={{ imageURL: 'https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg' }}
      />
      <p>Lorem ipsum sic dolor amet...</p>
    </CardContent>
  </Card>
);

export default Dashboard;
