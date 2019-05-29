import { Injectable } from "@angular/core";
import { APIClientService } from "../common/api-client.service";
import { ApiResponse } from "../../models/api-response";
import { Observable } from "rxjs";
import { ENDPOINTS } from "../../constants/endpoints";
import { Recipe } from "../../models/business/recipe";

@Injectable()
export class RecipeService {

    constructor(
        private _apiService: APIClientService
    ){
    }

	public insert(recipe: Recipe): Observable<ApiResponse> {
		return this._apiService.post(ENDPOINTS.BUSINESS.RECIPES, recipe);
	}

	public update(recipe: Recipe): Observable<ApiResponse> {
		return this._apiService.put(ENDPOINTS.BUSINESS.RECIPES, recipe);
	}

	public get(): Observable<ApiResponse> {
		return this._apiService.get(ENDPOINTS.BUSINESS.RECIPES);
	}

	public getById(id: number): Observable<ApiResponse> {
		return this._apiService.get(`${ENDPOINTS.BUSINESS.RECIPES}/${id}`);
	}

	public getCategoriesReduced(): Observable<ApiResponse> {
		return this._apiService.get(ENDPOINTS.BUSINESS.RECIPE_CATEGORIES_REDUCED)
	}

}
