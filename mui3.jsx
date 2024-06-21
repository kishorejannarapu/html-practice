import React from 'react';
import { Card, CardContent, Typography, Avatar, Button, Chip } from '@mui/material';

const ContractDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h6" className="mb-2">
        Contract details
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Reference id: 1234567890
      </Typography>
      <div className="grid grid-cols-1 gap-4 my-4">
        <Card className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <Typography variant="body1">543225 to 544121</Typography>
              <Typography variant="body2" color="textSecondary">Status: <Chip label="Pending" size="small" /></Typography>
              <Typography variant="body2" color="textSecondary">Recertification: <Chip label="Pending" size="small" /></Typography>
            </div>
            <div className="text-right">
              <Typography variant="body2" color="textSecondary">Created By</Typography>
              <div className="flex items-center">
                <Avatar alt="Spiderman" src="/path/to/avatar.jpg" />
                <div className="ml-2">
                  <Typography variant="body2">Spiderman</Typography>
                  <Typography variant="body2" color="textSecondary">spiderman@sc.com</Typography>
                </div>
              </div>
              <Typography variant="body2" color="textSecondary" className="mt-1">Updated on 17/06/2024</Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textPrimary" className="mb-2">Source</Typography>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">ITAM id</Typography>
                  <Typography variant="body1">543225</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Application name</Typography>
                  <Typography variant="body1">Moon</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Business criticality</Typography>
                  <Chip label="Medium" color="warning" size="small" />
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">SBIA rating</Typography>
                  <Typography variant="body1">3</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Service tag</Typography>
                  <Typography variant="body1">Security tool</Typography>
                </div>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textPrimary" className="mb-2">Destination</Typography>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">ITAM id</Typography>
                  <Typography variant="body1">544121</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Application name</Typography>
                  <Typography variant="body1">Jupiter</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Business criticality</Typography>
                  <Chip label="High" color="error" size="small" />
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">SBIA rating</Typography>
                  <Typography variant="body1">5</Typography>
                </div>
                <div className="mb-1">
                  <Typography variant="body2" color="textSecondary">Service tag</Typography>
                  <Typography variant="body1">Monitor</Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>

      <Card className="p-4 mt-4">
        <Typography variant="h6" className="mb-2">Approval</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center mb-2">
            <Avatar alt="Wonder Woman" src="/path/to/avatar.jpg" />
            <div className="ml-2">
              <Typography variant="body2">Consumer owner review</Typography>
              <Typography variant="body1">Wonder Woman</Typography>
              <Typography variant="body2" color="textSecondary">wonderwoman@sc.com</Typography>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <Avatar alt="Ironman" src="/path/to/avatar.jpg" />
            <div className="ml-2">
              <Typography variant="body2">Provider team review</Typography>
              <Typography variant="body1">Ironman</Typography>
              <Typography variant="body2" color="textSecondary">ironman@sc.com</Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="contained" color="error" className="mr-2">Reject</Button>
          <Button variant="contained" color="primary">Approve</Button>
        </div>
      </Card>
    </div>
  );
};

export default ContractDetails;