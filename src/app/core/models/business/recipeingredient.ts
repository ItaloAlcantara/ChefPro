import { Ingredient } from "./ingredient";
import { CorrectionFactor } from "../common/correctionfactor";
import { Unit } from "./unit";
import { PurchasePrice } from "../common/purchaseprice";

export interface RecipeIngredient{

    amount: number;
    unit: Unit;
    ingredient: Ingredient;
    correctionFactor: CorrectionFactor;
    purchasePrice: PurchasePrice;
    
}