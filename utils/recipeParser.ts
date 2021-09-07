const { v4: uuidv4 } = require('uuid');
import {
  getIngedientNoun,
  getInstructionClauses,
  getInstructionVerb,
  getDependencyNouns,
  getInstructionTime,
  getIngredientQuantity,
} from './nlp';
import { RecipeData } from '../models/recipeData';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Instruction } from '../models/instruction';
import { cleanInstructionText, cleanLabel } from './textCleaner';

export class RecipeParser {
  private ingredients = new Map<string, Ingredient>();
  private instructions: Instruction[] = [];

  private ingredientsLookup = new Map<string, string>();

  private stepCount = 0;

  private recipe: RecipeData;

  constructor(recipeData: RecipeData) {
    this.recipe = recipeData;
    for (const ingredient of recipeData.ingredients) {
      this.createIngredient(ingredient);
    }

    for (const instruction of recipeData.instructions) {
      let clauses = getInstructionClauses(instruction);
      let tempClause = null;
      for (let clause of clauses) {
        // consume skipped clauses
        if (tempClause) {
          clause = tempClause + ' ' + clause;
          tempClause = null;
        }
        // skip short clauses
        if (clause.split(' ').length <= 4) {
          tempClause = clause;
          continue;
        }
        const verb = getInstructionVerb(clause);
        const usedIngredients: string[] = [];
        const possibleIngredients = getDependencyNouns(clause);
        const duration = getInstructionTime(clause);
        for (const noun of possibleIngredients) {
          let ingredientId = this.ingredientsLookup.get(noun);
          if (ingredientId) {
            usedIngredients.push(ingredientId);
          }
        }
        let instruction = this.createInstruction(
          verb,
          clause,
          usedIngredients,
          duration
        );
        this.instructions.push(instruction);
      }
    }
  }

  private createIngredient(text: string): Ingredient {
    const label = getIngedientNoun(text);
    const quantity = getIngredientQuantity(text);
    const newIng: Ingredient = {
      id: uuidv4(),
      text,
      quantity,
      labels: [label],
      usedIn: [],
    };
    if (label.includes(' ')) {
      newIng.labels = label.split(' ').concat(newIng.labels);
    }

    for (let l of newIng.labels) {
      this.ingredientsLookup.set(l, newIng.id);
    }
    this.ingredients.set(newIng.id, newIng);
    return newIng;
  }

  private createInstruction(
    label: string,
    text: string,
    ingredients: string[],
    duration: number,
    concurrent: boolean = false
  ): Instruction {
    const instruction: Instruction = {
      id: uuidv4(),
      text: cleanInstructionText(text),
      duration,
      ingredients,
      labels: (label.includes(' ')
        ? [...label.split(' '), label]
        : [label]
      ).map((l) => cleanLabel(l)),
    };

    for (const ingId of ingredients) {
      const ing = this.ingredients.get(ingId);
      if (ing) {
        ing.usedIn.push({ instruction: instruction.id });
        this.ingredients.set(ingId, ing);
      }
    }
    return instruction;
  }

  public export(): Recipe {
    return {
      name: this.recipe.name,
      tags: this.recipe.tags,
      servings: this.recipe.servings,
      image: this.recipe.image,
      time: this.recipe.time,
      ingredients: Array.from(this.ingredients.values()),
      instructions: this.instructions,
    };
  }
}
