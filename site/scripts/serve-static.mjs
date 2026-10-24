// Static server for the marketing landing (or another folder: argv[3]) — preview only (npm-free).
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = new URL(`../../${process.argv[3] ?? 'landing'}/`, import.meta.url).pathname
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png' }
const port = Number(process.argv[2] ?? 3300)

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  if (path.endsWith('/')) path += 'index.html'
  try {
    const body = await readFile(join(root, path))
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(body)
  } catch {
    res.writeHead(404).end('not found')
  }
}).listen(port, () => console.log(`landing on http://localhost:${port}`))
