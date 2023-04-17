import { FC } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';

import darkTheme from '@/styles/theme/darkTheme';
import createEmotionCache from '../../utility/createEmotionCache';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

interface IMyApp extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: FC<IMyApp> = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
