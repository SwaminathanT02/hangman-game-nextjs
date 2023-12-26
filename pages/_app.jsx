import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
                <SpeedInsights />
            </Layout>
        </SessionProvider>
    )
}