import { readdir, writeFile } from 'node:fs/promises'
import { extname } from 'node:path'

const scrapbookDirectory = new URL('../public/scrapbook/', import.meta.url)
const manifestFile = new URL('photos.json', scrapbookDirectory)
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'])

const files = (await readdir(scrapbookDirectory))
  .filter((file) => supportedExtensions.has(extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

await writeFile(manifestFile, `${JSON.stringify(files, null, 2)}\n`)
console.log(`Scrapbook: found ${files.length} hosted photo${files.length === 1 ? '' : 's'}.`)
