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
} from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import React, { useEffect, useState } from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import PropTypes from 'prop-types'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import styles from './Header.module.scss'
function ElevationScroll(props: any) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

const Header = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [user, setUser] = useState({});
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // if(localStorage.getItem('user')){
      
    //   setUser(user);
    // }
  }, [])
  const links = [
    { id: 1, route: 'Home', url: '/products' },
    // { id: 2, route: 'Products', url: '/products' },
    {
      id: 3,
      route: (
       <><Tooltip title="My Bag">
          <ShoppingBagRoundedIcon /> 
        </Tooltip></> 
      ),
      url: '/bag',
    },
    // {
    //   id: 3,
    //   route: (
    //     <Tooltip title="logout">
    //       <LogoutIcon />
    //     </Tooltip>
    //   ),
    //   url: '/login',
    // },
  ]
  const linksForMobile = [
    { id: 1, route: 'Home', url: '/products' },
    // { id: 2, route: 'Products', url: '/products' },
    {
      id: 3,
      route: 'My Bag',
      url: '/bag',
    },
    {
      id: 3,
      route: 'Logout',
      url: '/login',
    },
  ]
  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor: any, open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor: any) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    > <Box sx={{m:2}}>
        <Avatar sx={{ width: 30, height: 30, fontSize:18 }}>{user?.username?.charAt(0)}</Avatar>
      <Box component="h5" sx={{m:0}}>Hello {user?.username}</Box>
      <Box component="h6" sx={{m:0}}>{user?.email}</Box>
    </Box>
      <hr />
      <List>
        {linksForMobile.map((link) => (
          <Link component="a" className={styles['header__links']} href={link.url} underline="none">
            <ListItem button key={link.id}>
              <ListItemText primary={link.route} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar sx={{ background: 'white' }}>
          <Toolbar className={styles['header']}>
            <Link href="/" underline="none">
              <Typography variant="h5">GraphQL POC</Typography>
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

                <Drawer anchor="right" open={state['right']} onClose={toggleDrawer('right', false)}>
                  {list('right')}
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: '0.05',
                }}
              >
                {links.map((link) => (
                  <Link
                    component="a"
                    className={styles['header__links']}
                    href={link.url}
                    underline="none"
                    key={link.id}
                  >
                    <Typography>{link.route}</Typography>
                  </Link>
                ))}
                 <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            disableFocusRipple
            disableRipple
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 30, height: 30, fontSize:18 }}>{user?.username?.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         {/* <MenuItem> */}
         <Box sx={{m: 1}}>
          Username: {user?.username}
         </Box>
         <Box sx={{m: 1}}>
          Email: {user?.email}
         </Box>
         
        {/* </MenuItem> */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
                {/* <Tooltip title="Log out" enterDelay={500} leaveDelay={200}><Link component="a" className={styles['header__links']} href={'/login'} underline="none">
            
                </Link>
                </Tooltip> */}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  )
}

export default Header
