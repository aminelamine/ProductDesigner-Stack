// Empty PostCSS config, on purpose.
//
// Nextra 4 ships its theme CSS pre-compiled and this site's globals.css is
// plain CSS, so no PostCSS plugins are needed. Its real job is to STOP Next
// from walking up the directory tree and picking up the root app's
// postcss.config.mjs, which requires `@tailwindcss/postcss` — a module that
// only exists in the root's node_modules, not here. On Netlify (base=site)
// the root is never installed, so that lookup failed the build.
const config = {
  plugins: {}
}

export default config
