import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', background: '#900C3F' }}>
          <div>
            <h2>GraphQL POC</h2>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
