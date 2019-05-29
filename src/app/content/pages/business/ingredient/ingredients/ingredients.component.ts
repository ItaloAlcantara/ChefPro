import { ApiResponse } from './../../../../../core/models/api-response';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IngredientService } from '../../../../../core/services/business/ingredient.service';
import { IngredientDTO } from '../../../../../core/models/business/dto/ingredient-dto';
import { CpLoadingService } from '../../../../../core/services/common/cp-loading.service';
import { Router } from '@angular/router';
import { CpRoutes } from '../../../../../core/constants/cp-routes';
import { CpLocalStorageService } from '../../../../../core/services/common/cp-localstorage.service';
import { CpFilter } from '../../../../../core/models/common/filter';
import { CPPagination } from '../../../../../core/models/common/cp-pagination';
import { CpBaseComponent } from '../../../common/cp-base/cp-base.component';

@Component({
	selector: 'm-ingredients',
	templateUrl: './ingredients.component.html',
	styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent extends CpBaseComponent implements OnInit {

	ingredients: IngredientDTO[];

	searchText: string;

	constructor(
		_cdr: ChangeDetectorRef,
		_loading: CpLoadingService,
		private _service: IngredientService,
		private _localStorage: CpLocalStorageService,
		private _router: Router
	) {
		super(_loading, _cdr);
	}

	ngOnInit() {
		this.fetchIngredients();
	}

	fetchIngredients(name?: string) {
		this._loading.show();
		this._service.getByUser(this._localStorage.getLoggedUser().id, {
			currentPage: this.pagination.currentPage,
			name
		}).subscribe((apiResponse: ApiResponse) => {
			this.ingredients = apiResponse.data;
			this.fillPaginationWithApiResponse(apiResponse);
			this._loading.hide();
		}, (apiResponse: ApiResponse) => {
			this._loading.hide();
		});
	}

	new() {
		this._router.navigate([CpRoutes.INGREDIENT])
	}

	edit(id: number) {
		this._router.navigate([CpRoutes.INGREDIENT, id])
	}

}
