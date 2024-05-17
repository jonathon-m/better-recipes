import { Quantity } from './quantity';

export interface Ingredient {
  id: string;
  text: string;
  labels: string[];
  quantity: Quantity;
  usedIn: { instruction: string; quantity?: Quantity }[];
}
