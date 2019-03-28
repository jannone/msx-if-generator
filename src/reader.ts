import fs = require('fs')
import YAML = require('yaml')

import { Game } from './types'

const gameFromJson = (filename: string): Game => {
  const data = fs.readFileSync(filename, "utf-8")
  return JSON.parse(data)
}

const gameFromYaml = (filename: string): Game => {
  const data = fs.readFileSync(filename, "utf-8")
  return YAML.parse(data)
}

export const gameFromFilename = (filename: string) => {
  if (filename.match(/\.json$/i)) {
    return gameFromJson(filename)
  }
  if (filename.match(/\.(yml|yaml)$/i)) {
    return gameFromYaml(filename)
  }
  throw "Unknown file extension. Please use .json, .yml or .yaml"
}
