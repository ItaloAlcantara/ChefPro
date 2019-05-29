import { Ingredient } from "./ingredient";
import { CorrectionFactor } from "../common/correctionfactor";
import { Unit } from "./unit";
import { PurchasePrice } from "../common/purchaseprice";

export interface MenuIngredient{

	itemId: number;
	itemName: string;
	itemType: number;
    amount: number;
    unit: Unit;
    correctionFactor: CorrectionFactor;
    purchasePrice: PurchasePrice;

}
