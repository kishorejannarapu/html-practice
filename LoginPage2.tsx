import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Link, styled, useTheme } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ImageContainer = styled(Grid)(({ theme }) => ({
  background: 'url("your_image_url.jpg")', // Replace with your image URL
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  height: '100vh',
  margin: 0,  // Resetting margin to 0
}));

const FormContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(8), // Adjust the width based on your requirement
  height: theme.spacing(8), // Adjust the height based on your requirement
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
}));

const useStyles = () => ({
  avatar: {
    margin: (theme) => theme.spacing(1),
    backgroundColor: (theme) => theme.palette.primary.main,
  },
});

const LoginPage = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container component="main">
      {/* Left side - Image */}
      <ImageContainer item xs={12} sm={4} md={7}>
        {/* You can add content or components inside the image container */}
      </ImageContainer>

      {/* Right side - Login Form */}
      <FormContainer item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <AvatarStyled>
            <LockOutlinedIcon />
          </AvatarStyled>
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
      </FormContainer>
    </Grid>
  );
};

export default LoginPage;
