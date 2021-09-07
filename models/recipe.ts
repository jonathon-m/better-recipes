import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
  servings: string;
  image: string;
  time: {
    prep: string;
    cook: string;
    active: string;
    inactive: string;
    ready: string;
    total: string;
  };
}
