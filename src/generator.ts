import { CodeOutput } from './output'
import { Game, Node } from './types'
import { wordwrap } from './util'

const MAX_DISPLAY_LEN = 20

export class Generator
{
  private output: CodeOutput

  constructor(outputBuilder: () => CodeOutput) {
    this.output = outputBuilder()
  }

  public generateProgramCode(game: Game): Buffer
  {
    if (game.nodes.length > 0) {
      this.output.addLabel("setupNode")
      this.output.addLine("ON AR GOSUB " + game.nodes.map((node) => `$label_setup_${node.name}`).join(","))
      this.output.addLine("RETURN")

      this.output.addLabel("handleOptions")
      this.output.addLine("ON AR GOSUB " + game.nodes.map((node) => `$label_handleOptions_${node.name}`).join(","))
      this.output.addLine("RETURN")

      game.nodes.forEach((node) => {
        this.generateNodeCode(game, node)
      })
    }

    return this.output.generate()
  }

  private validateNode(node: Node) 
  {
    if (node.name.match(/[^a-zA-Z_]/)) {
      throw new Error("Node name must contain only letters and underscore")
    }
  }

  private generateNodeSetup(node: Node)
  {
    const textDisplay = wordwrap(node.display, MAX_DISPLAY_LEN, "|")
    this.output.addLabel(`setup_${node.name}`)
    this.output.addLine(`T$=\"${textDisplay}\"`)
    if (node.screen) {
      this.output.addLine(`S$=\"${node.screen}\"`)
    }
    this.output.addLine("OC=0")
    node.options.forEach((option, optionIdx) => {
      const optionLine = `OC=OC+1:O$(OC)="${option.label}":OO(OC)=${optionIdx + 1}`
      if (option.displayIf) {
        this.output.addLine(`IF ${option.displayIf} THEN ${optionLine}`)
      } else {
        this.output.addLine(optionLine)
      }
    })
    this.output.addLine("RETURN")
  }

  private generateNodeOptionHandlers(game: Game, node: Node)
  {
    const nodeIndexes = game.nodes.map((gameNode) => gameNode.name)
    const getNodeIndexByName = (name: string) => nodeIndexes.indexOf(name) + 1

    this.output.addLabel(`handleOptions_${node.name}`)
    if (node.options && node.options.length > 0) {
      this.output.addLine("ON OO(AO) GOTO " + node.options.map((option, optionIdx) => `$label_handleOption_${node.name}_${optionIdx}`).join(","))
    }
    
    node.options.forEach((option, optionIdx) => {
      this.output.addLabel(`handleOption_${node.name}_${optionIdx}`)
      if (option.goto) {
        const optionGoto = getNodeIndexByName(option.goto)
        this.output.addLine(`AR=${optionGoto}`)
      }
      if (option.alert) {
        const optionAlert = wordwrap(option.alert, MAX_DISPLAY_LEN, "|")
        this.output.addLine(`P$="${optionAlert}"`)
      }
      if (option.run) {
        this.output.addLine(option.run)
      }
      this.output.addLine("RETURN")
    })
  }

  private generateNodeCode(game: Game, node: Node) 
  {
    this.validateNode(node)
    this.generateNodeSetup(node)
    this.generateNodeOptionHandlers(game, node)
  }
}
