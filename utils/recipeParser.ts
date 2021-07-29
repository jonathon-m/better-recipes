const { v4: uuidv4 } = require('uuid');
import { 
    getIngedientNoun, 
    getInstructionClauses, 
    getInstructionVerb, 
    indicatesConcurrentAction, 
    getDependencyNouns } from './nlp';
import { RecipeData } from '../models/recipeData';
import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Instruction } from '../models/instruction';
import { Step } from '../models/step';

export class RecipeParser {
    
    private ingredients = new Map<string, Ingredient>()
    private steps: Step[] = []

    private ingredientsLookup = new Map<string, string>()

    private stepCount = 0;

    private recipe: RecipeData;

    constructor(recipeData: RecipeData) {
        this.recipe = recipeData;
        for (const ingredient of recipeData.ingredients) {
            const noun = getIngedientNoun(ingredient)
            this.createIngredient(noun, ingredient)
        }
        
        let lastActions: string[] = [];
        for (const instruction of recipeData.instructions) {
            let clauses = getInstructionClauses(instruction)
            for (const clause of clauses) {
                const verb = getInstructionVerb(clause)
                const concurrent = indicatesConcurrentAction(clause);
                const dependencies: string[] = [];
                const possibleIngredients = getDependencyNouns(clause);
                for (const noun of possibleIngredients) {
                    let ingredientId = this.ingredientsLookup.get(noun)
                    if (ingredientId) {
                        dependencies.push(ingredientId)
                    }
                }
                let action = this.createInstruction(verb, clause, dependencies.concat(lastActions), concurrent);
                if (concurrent) {
                    lastActions.push(action.id)
                } else {
                    lastActions = [action.id]
                }
            }
        }
    }

    private createIngredient(label: string, text: string): Ingredient {
        const newIng = {
            id: uuidv4(),
            text,
            quantity: 0, 
            quantityUnits: 'grams',
            dependencies: [],
            labels: [label]
        }
        if (label.includes(' ')) {
            newIng.labels = newIng.labels.concat(label.split(' '))
        }

        for (let l of newIng.labels) {
            this.ingredientsLookup.set(l, newIng.id);
        }
        this.ingredients.set(newIng.id, newIng);
        return newIng
    }

    private createInstruction(label: string, text: string, ingredients: string[], concurrent: boolean = false): Instruction {
        const instruction: Instruction = {
            id: uuidv4(),
            text,
            duration: 0,
            durationUnits: 'mins',
            ingredients,
            labels: [label]
        }
        if (label.includes(' ')) {
            instruction.labels = instruction.labels.concat(label.split(' '))
        }
        if (!concurrent) {
            this.steps.push({
                index: this.stepCount,
                instructions: [instruction]
            });
            this.stepCount += 1;
        } else {
            this.steps[this.steps.length-1].instructions.push(instruction);
        }
        
        return instruction
    }

    public export(): Recipe {
        return {
            name: this.recipe.name,
            tags: this.recipe.tags,
            servings: this.recipe.servings,
            image: this.recipe.image,
            time: this.recipe.time,
            ingredients: Array.from(this.ingredients.values()),
            steps: this.steps
        }
    }

}
