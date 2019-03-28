export class Option
{
  label: string
  displayIf: string
  goto: string
  alert: string
  run: string
}

export class Node
{
  name: string
  screen: string
  display: string
  options: Option[]
}

export class Game 
{
  title: string
  author: string
  email: string
  version: string|number
  releaseDate: string
  nodes: Node[]
}
