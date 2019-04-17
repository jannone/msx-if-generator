#!/usr/bin/env node

import fs = require('fs')
import path = require('path')

import { Generator } from './generator'
import { CodeOutput } from './output'
import { gameFromFilename } from './reader'

const TEMPLATE_FILE = "../templates/template.bas"

const main = () => {
  const templateFilename = path.resolve(__dirname, TEMPLATE_FILE)
  const gameFilename = process.argv[2]
  if (!gameFilename) {
    // tslint:disable-next-line:no-console
    console.error("No input file specified")
    return
  }
  const game = gameFromFilename(gameFilename)
  const template = fs.readFileSync(templateFilename, "utf-8")
  const outputBuilder = () => CodeOutput.fromTemplate(template)
  const generator = new Generator(outputBuilder)
  const result = generator.generateProgramCode(game)
  // tslint:disable-next-line:no-console
  process.stdout.write(result)
}

if (require.main === module) { 
  main()
}
