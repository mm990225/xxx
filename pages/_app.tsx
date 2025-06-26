import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* 网站标题和描述 */}
        <title>PolyAlpha - Track smart money. Follow Alpha. Trade smarter.</title>
        <meta name="description" content="Discover hidden alpha from top Polymarket traders—in real time. Track smart money and follow alpha to trade smarter." />
        
        {/* Favicon配置 */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="mask-icon" href="/images/logo.png" color="#1026D2" />
        
        {/* 移动端优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* SEO优化 */}
        <meta name="theme-color" content="#1026D2" />
        <meta name="keywords" content="PolyAlpha, Polymarket, trading, alpha, smart money, crypto, prediction market" />
        <meta name="author" content="PolyAlpha" />
        
        {/* Open Graph */}
        <meta property="og:title" content="PolyAlpha - Track smart money. Follow Alpha." />
        <meta property="og:description" content="Discover hidden alpha from top Polymarket traders—in real time." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.polyalpha.fun/" />
        <meta property="og:image" content="https://www.polyalpha.fun/images/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
} 