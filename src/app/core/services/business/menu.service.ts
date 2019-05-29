import { Injectable } from "@angular/core";
import { APIClientService } from "../common/api-client.service";
import { ApiResponse } from "../../models/api-response";
import { Observable } from "rxjs";
import { ENDPOINTS } from "../../constants/endpoints";
import { Menu } from "../../models/business/menu";

@Injectable()
export class MenuService {

    constructor(
        private _apiService: APIClientService
    ){
    }

	public insert(menu: Menu): Observable<ApiResponse> {
		return this._apiService.post(ENDPOINTS.BUSINESS.MENUS, menu);
	}

	public update(menu: Menu): Observable<ApiResponse> {
		return this._apiService.put(ENDPOINTS.BUSINESS.MENUS, menu);
	}

	public get(): Observable<ApiResponse> {
		return this._apiService.get(ENDPOINTS.BUSINESS.MENUS);
	}

	public getById(id: number): Observable<ApiResponse> {
		return this._apiService.get(`${ENDPOINTS.BUSINESS.MENUS}/${id}`);
	}

}
