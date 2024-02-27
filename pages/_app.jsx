import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import { SpeedInsights } from "@vercel/speed-insights/next"
import React from 'react';
import PropTypes from 'prop-types';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/CreateEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps, session }) {
    return (
        <CacheProvider value={emotionCache}>
            <SessionProvider session={session}>
                <Layout>
                    <Component {...pageProps} />
                    <SpeedInsights />
                </Layout>
            </SessionProvider>
        </CacheProvider>
    )
}

export default App;

App.propTypes = {
    Component: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pageProps: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    emotionCache: PropTypes.object,
};