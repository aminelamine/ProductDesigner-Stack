import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'

export const metadata = {
  title: {
    default: 'PDS Stack — Design is the quality gate',
    template: '%s — PDS Stack'
  },
  description:
    'PDS Stack is a design-first AI workflow. Five agents turn a product designer’s creative judgment into enforceable architecture — direction before execution, frozen scope, cumulative learnings.',
  metadataBase: new URL('https://pds-stack.netlify.app')
}

const repo = 'https://github.com/aminelamine/ProductDesigner-Stack'

const navbar = (
  <Navbar
    // Raw <a href="/"> so Next's basePath does NOT prefix it — the logo must
    // return to the official landing page at the site root, not to /docs.
    logo={
      // eslint-disable-next-line @next/next/no-html-link-for-pages -- must escape basePath to reach the landing at site root
      <a
        href="/"
        aria-label="PDS Stack — home"
        style={{ display: 'flex', alignItems: 'center', gap: '.55rem', fontWeight: 700, letterSpacing: '-.02em', color: 'inherit', textDecoration: 'none' }}
      >
        <span className="pds-mark" />
        PDS<span style={{ opacity: 0.55, fontWeight: 400 }}>STACK</span>
      </a>
    }
    logoLink={false}
    projectLink={repo}
  />
)

const footer = (
  <Footer>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem' }}>
      MIT {new Date().getFullYear()} · Built by @aminelamine + Claude · Design is the quality gate.
    </span>
  </Footer>
)

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 9, saturation: 100, lightness: { dark: 66, light: 52 } }} />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase={`${repo}/tree/main/site`}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
