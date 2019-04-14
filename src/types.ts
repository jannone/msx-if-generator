export interface Option
{
  label: string
  displayIf?: string
  goto?: string
  alert?: string
  run?: string
}

export interface Node
{
  name: string
  screen: string
  display: string
  options: Option[]
}

export interface Game 
{
  title: string
  author: string
  email: string
  version: string|number
  releaseDate: string
  nodes: Node[]
}
