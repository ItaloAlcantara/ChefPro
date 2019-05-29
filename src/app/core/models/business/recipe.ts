import { RecipeIngredient } from "./recipeingredient";
import { Financial } from "./financial";

export interface Recipe {
	id: number;
	name: string;
	recipeCategory: any;
	preparationTime: number;
	unityQuantity: number;
	unit: any;
	description: string;
	financial: Financial;
	steps: any[];
	ingredients: RecipeIngredient[];
}
