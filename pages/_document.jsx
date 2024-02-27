import React from 'react';
import PropTypes from 'prop-types';
import Document, {
    Head, Html, Main, NextScript,
} from 'next/document';
// eslint-disable-next-line import/no-extraneous-dependencies
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/CreateEmotionCache';

const MyDocument = (props) => {
    const { emotionStyleTags } = props;

    return (
        <Html lang="en-US">
            <Head>
                <meta name="emotion-insertion-point" content="" />
                {emotionStyleTags}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage;
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
        },
        enhanceComponent: (Component) => Component,
    });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};

MyDocument.propTypes = {
    emotionStyleTags: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default MyDocument;
