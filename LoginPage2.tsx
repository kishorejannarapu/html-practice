import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  imageContainer: {
    background: 'url("your_image_url.jpg")', // Replace with your image URL
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      {/* Left side - Image */}
      <Grid item xs={false} sm={4} md={7} className={classes.imageContainer}>
        {/* You can add content or components inside the image container */}
      </Grid>

      {/* Right side - Login Form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* Login Form */}
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
