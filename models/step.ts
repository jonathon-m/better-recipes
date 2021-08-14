import { Instruction } from "./instruction";

export interface Step {
    index: number
    instructions: Instruction[]
    ingredients: string[]
  }