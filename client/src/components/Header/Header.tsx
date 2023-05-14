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
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Logout from '@mui/icons-material/Logout'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import React, { useEffect, useState } from 'react'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import PropTypes from 'prop-types'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Button from '@mui/material/Button'
import styles from './Header.module.scss'
import { WindowOutlined } from '@mui/icons-material'
import { useQuery } from '@apollo/client'
import GET_CART from '../../graphql/Queries/Cart'
function ElevationScroll(props: any) {
  const { children, window } = props
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
  window: PropTypes.func,
}

const Header = (props: any) => {
  const [bagItems, setBagItems] = useState(1)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const cartId = localStorage.getItem('cartId') || ''

  const { loading, error, data } = useQuery(GET_CART, {
    variables: {
      cartId,
    },
    onCompleted: ({ cart }) => {
      setBagItems(cart?.lineItems.length)
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const links = [
    { id: 1, route: 'Home', url: '/products' },
    {
      id: 3,
      route: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div title="My Bag">
            <ShoppingBagRoundedIcon />
          </div>
          {bagItems > 0 && <p>{bagItems}</p>}
        </div>
      ),
      url: '/bag',
    },
  ]
  const linksForMobile = [
    { id: 1, route: 'Home', url: '/products' },
    {
      id: 2,
      route: 'My Bag',
      url: '/bag',
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
    >
      {' '}
      <Box sx={{ m: 2 }}>
        <Avatar sx={{ width: 30, height: 30, fontSize: 18 }}>{user?.username?.charAt(0)}</Avatar>
        <Box component="h5" sx={{ m: 0 }}>
          Hello {user?.username}
        </Box>
        <Box component="h6" sx={{ m: 0 }}>
          {user?.email}
        </Box>
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

  useEffect(() => {
    window.addEventListener('cart', (event: any) => {
      console.log(event, 'Event')
      setBagItems(event.data.length)
    })
  })

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
                  alignItems: 'center',
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
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                      {link.route}
                    </Typography>
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
                    <Avatar sx={{ width: 30, height: 30, fontSize: 18 }}>
                      {user?.username?.charAt(0)}
                    </Avatar>
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
                  <Box sx={{ m: 1 }}>Username: {user?.username}</Box>
                  <Box sx={{ m: 1 }}>Email: {user?.email}</Box>

                  {/* </MenuItem> */}
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link
                      component="a"
                      className={styles['header__links']}
                      href="/login"
                      underline="none"
                      key="logout"
                    >
                      <Typography>Logout</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  )
}

export default Header
