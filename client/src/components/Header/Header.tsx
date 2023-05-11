import {
  AppBar,
  Typography,
  Link,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './Header.module.scss';
function ElevationScroll(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props: any) => {
  const links = [
    { id: 1, route: 'Home', url: '/products' },
    // { id: 2, route: 'Products', url: '/products' },
    { id: 3, route: 'My Bag', url: '/bag' },
    { id: 4, route: 'Logout', url: '/login' },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: any, open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <Link component="a" className={styles['header__links']} href={link.url} underline="none">
       
          <ListItem button key={link.id}>
            <ListItemText primary={link.route} />
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar  sx={{background: 'white'}}>
          <Toolbar className={styles['header']}>
            <Link href="#" underline="none">
              <Typography variant="h5">
                GraphQL POC
              </Typography>
            </Link>

            {matches ? (
              <Box>
              <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
            </Box>
            ): <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexGrow: '0.05',
              }}
            >
              {links.map((link) => (
                <Link component="a" className={styles['header__links']} href={link.url} underline="none" key={link.id}>
                  <Typography>{link.route}</Typography>
                </Link>
              ))}
              <Link component="a" className={styles['header__links']} href={'/login'} underline="none">
                  <LogoutIcon />
                </Link>
              
            </Box>}
           
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;