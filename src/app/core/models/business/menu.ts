import { MenuIngredient } from './menuingredient';
import { RecipeIngredient } from "./recipeingredient";

export interface Menu {
	id: number;
	name: string;
	preparationTime: number;
	unityQuantity: number;
	unit: any;
	description: string;
	financial: any;
	ingredients: MenuIngredient[];
}
