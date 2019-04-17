import "jest"

import * as fs from "fs"

import { Generator } from '../src/generator'
import { CodeOutput } from '../src/output'
import { Game } from '../src/types'

describe("Generator", () => {
  it("must generate a empty adventure", () => {
    const game: Game = {
      title: "",
      author: "",
      email: "",
      version: 1,
      releaseDate: "",
      nodes: []
    }
    const outputBuilder = () => new CodeOutput()
    const generator = new Generator(outputBuilder)
    const result = generator.generateProgramCode(game)
    expect(result.length).toBe(0)
  })

  it("must generate a node with options", () => {
    const expectedCode = fs.readFileSync("./tests/fixtures/generator_node_with_options.txt", "utf8")
    const game: Game = {
      title: "",
      author: "",
      email: "",
      version: 1,
      releaseDate: "",
      nodes: [{
        name: "NODE",
        screen: "NODE.SC2",
        display: "This is a test node",
        options: [{
          label: "OPTION_A"
        },{
          label: "OPTION_B"
        }]
      }]
    }
    const output = new CodeOutput()
    const outputBuilder = () => output
    const generator = new Generator(outputBuilder)
    generator.generateProgramCode(game)
    expect(output.debug()).toBe(expectedCode)
  })
})
