import { convertStringToMSX } from "./util";

export class CodeOutput
{
  public static fromTemplate(template: string): CodeOutput {
    const output = new CodeOutput()
    const lines = template.split("\n")
    const getLabel = (line: string): string|null => {
      const m = line.match(/^\$label_([a-zA-Z0-9_]+):/)
      return m ? m[1] : null
    }
    lines.forEach((lineSource) => {
      const line = lineSource.trim()
      if (line === "") {
        return
      }
      const label = getLabel(line)
      if (label) {
        output.addLabel(label)
      } else {
        output.addLine(line)
      }
    })
    return output
  } 

  private lines: string[]
  private labels: { [label: string]: number }

  constructor() {
    this.lines = []
    this.labels = {}
  }

  public addLine(line: string) {
    this.lines.push(line)
  }

  public addLines(lines: string[]) {
    lines.forEach((line) => this.addLine(line))
  }

  public addLabel(label: string) {
    this.labels[label] = this.lines.length
  }

  public getLineByLabel(label: string): number {
    return this.labels[label]
  }

  public generate(): Buffer {
    const toLineNumber = (num: number) => String(num * 10 + 10)
    const replaceLabelReferences = (line: string) => line.replace(/\$label_([a-zA-Z0-9_]+)/g, (m, m1) => {
      return toLineNumber(this.labels[m1])
    })
    const body = this.lines.map((line, idx) => {
      return toLineNumber(idx) + " " + replaceLabelReferences(line)
    }).join("\r\n")
    return Buffer.from(convertStringToMSX(body), 'ascii')
  }

  public debug(): string {
    return this.lines.map((line, lineIdx) => {
      return Object.entries(this.labels)
        .filter(([key, value]) => lineIdx === value)
        .map(([key, value]) => `$label_${key}:\n`).join("") +
      line
    }).join("\n")
  }
}
