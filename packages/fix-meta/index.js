#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { promisify } = require('util')

const metaReg = /\/\/ *==UserScript==\s+(?:\/\/.*$\s+)*\/\/ *==\/UserScript==/m

main(process.argv).catch(err => console.error(err))

async function main(args) {
  const [, , globPattern] = args
  const files = await promisify(glob)(globPattern)

  return Promise.all(
    files.map(async file => {
      const body = await promisify(fs.readFile)(file, 'utf-8')
      const meta = metaReg.exec(body)
      if (meta) {
        await promisify(fs.writeFile)(file, meta[0] + '\n\n' + body.replace(metaReg, '').trim())
        console.log(`meta comment fixed: ${path.basename(file)}`)
      }
    }),
  )
}
