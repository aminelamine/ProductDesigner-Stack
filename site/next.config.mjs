import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: {
    codeblocks: false
  }
})

export default withNextra({
  output: 'export',
  basePath: '/docs',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true
})
