// Using Example from MUI docs
import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Cards', path: '/generatecards' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: "black" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ height: '64px', position: 'relative' }} >
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <img src="/assets/FlashdeckLogoOnly.png" alt="Logo" style={{ height: '50px', marginRight: '0.5rem' }} />
            <img src="/assets/FlashdeckTextOnly.png" alt="Title" style={{ height: '40px', marginTop: '5px' }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.path} passHref>
                      <Button
                        textalign="center"
                        variant="outlined"
                        color='#9F2B68'
                      >
                          {page.name}
                      </Button>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} style={{ textDecoration: 'none' }} passHref>
                <Button
                  variant="contained"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}
                  color="#9F2B68"
                >
                  {page.name}
                </Button>
              </Link>
            ))}
            <SignedOut>
              <Button variant="contained" color='' sx={{ my: 2, ml: 2, color: 'white', display: 'block' }} href="/sign-in">Login</Button>
              <Button variant='contained' color='' sx={{ my: 2, ml: 2, color: 'white', display: 'block' }} href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}/>
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
