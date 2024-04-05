import AppRouter from './app-router';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { RecoilRoot } from 'recoil';

const App = () => {
  const darkTheme = createTheme({});

  return (
    <RecoilRoot>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
