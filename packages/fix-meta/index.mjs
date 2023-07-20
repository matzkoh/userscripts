#!/usr/bin/env node

import { glob } from 'glob'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const metaReg = /(\/\/ *==UserScript==\s+(?:\/\/.*\n)*\/\/ *==\/UserScript==)/

main(process.argv).catch(err => console.error(err))

async function main(args) {
  const [, , globPattern] = args
  const files = await glob(globPattern)

  return Promise.all(
    files.map(async file => {
      const body = await readFile(file, 'utf-8')
      const [pre, meta, post] = body.split(metaReg, 3)
      const code = (pre + post).replace('require("fs")', '')

      if (meta) {
        await writeFile(file, meta + '\n\n' + code)
        console.log(`meta comment fixed: ${path.basename(file)}`)
      }
    }),
  )
}
