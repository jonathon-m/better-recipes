import { Duration } from "./duration";

export interface Instruction {
  id: string
  text: string
  labels: string[]
  ingredients: string[]
  duration: number,
  
}