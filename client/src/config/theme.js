const theme = {
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 60,
    },
    easing: {
      // This is the most common easing curve.
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#d31334',
    },
    secondary: {
      main: '#333',
    },
    error: {
      main: '#e67d74',
    },
    warning: {
      main: '#ebb660',
    },
    background: {
      main: '#d31334',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  components: {
    MuiListItem: {
      background: '#d31334',
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#8e888850',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#8e888850',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red', fontSize: 20 },
      },
    },
    MuiFormHelperText: {
      root: {
        marginLeft: '0px',
      },
    },
  },
  props: {
    MuiListItemIcon: {
      root: {
        minWidth: 36,
      },
    },

    MuiAppBar: {
      color: 'inherit',
    },
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      root: {
        marginLeft: '0px',
      },
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
  },
};
export default theme;
