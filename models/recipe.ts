import { Ingredient } from "./ingredient";
import { Step } from "./step";

export interface Recipe {
    name: string;
    ingredients: Ingredient[];
    steps: Step[];
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
    }
  }