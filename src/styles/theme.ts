import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  // テーマカラー
  // https://material.io/resources/color/
  palette: {
    primary: {
      light: '#6d6d6d',
      main: '#424242',
      dark: '#1b1b1b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff94c2',
      main: '#f06292',
      dark: '#ba2d65',
      contrastText: '#000000',
    },
  },
  typography: {
    button: {
      textTransform: 'none', //ボタンのラベルが大文字になるのを防ぐ
    },
  },
});

export default theme;
