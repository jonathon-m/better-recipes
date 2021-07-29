export interface RecipeData {
    name: string;
    ingredients: string[];
    instructions: string[];
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