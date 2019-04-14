import fs = require('fs')

import { Generator } from './generator'
import { CodeOutput } from './output'
import { gameFromFilename } from './reader'

const templateFilename = "./src/templates/template.bas"

const main = () => {
  const gameFilename = process.argv[2]  
  if (!gameFilename) {
    throw new Error("No input file specified")
  }
  const game = gameFromFilename(gameFilename)
  const template = fs.readFileSync(templateFilename, "utf-8")
  const outputBuilder = () => CodeOutput.fromTemplate(template)
  const generator = new Generator(outputBuilder)
  const result = generator.generateProgramCode(game)
  // tslint:disable-next-line:no-console
  console.log(result)
}

if (require.main === module) { 
  main()
}
