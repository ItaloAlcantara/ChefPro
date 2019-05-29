import { User } from "../user";

export interface Ingredient {

	id: number;
	name: string;
	ingredientCategory: any; //TODO: relacionamento
    purchasePrice: any;
    unit: any;
    description: string;
    user: User;
    ingredientCopiedId: number;

}
