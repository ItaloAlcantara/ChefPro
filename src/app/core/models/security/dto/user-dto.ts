import { Region } from "../../business/region";

export interface UserDTO {

    id: number;

    name: String;

    email: String;

    filterByState: Boolean;

    region: Region;

    amountOfIngredients: number;

    amountOfRecipes: number;

    amountOfMenus: number;
}