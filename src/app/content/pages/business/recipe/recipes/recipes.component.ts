import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../../../../../core/services/business/recipe.service';
import { ApiResponse } from '../../../../../core/models/api-response';
import { RecipeDTO } from '../../../../../core/models/business/dto/recipe-dto';
import { CpLoadingService } from '../../../../../core/services/common/cp-loading.service';
import { Router } from '@angular/router';
import { CpRoutes } from '../../../../../core/constants/cp-routes';
import { CpBaseComponent } from '../../../common/cp-base/cp-base.component';

@Component({
    selector: 'm-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent extends CpBaseComponent {

    recipes: RecipeDTO[];

    constructor(
        protected _loading: CpLoadingService,
		protected _cdr: ChangeDetectorRef,
        private _service: RecipeService,
        private _router: Router
    ) {
        super(_loading, _cdr);        
    }

    ngOnInit() {
        this.fetchRecipes();
    }

    fetchRecipes(): any {
        this._loading.show();
        this._service.get().subscribe(
            (apiResponse: ApiResponse) => {
                this.recipes = apiResponse.data;
                this._loading.hide();
                this.onChangeComponent();
            },
            error => {
                this._loading.hide();
            }
        )
    }

    new() {
		this._router.navigate([CpRoutes.RECIPE])
	}

	edit(id: number) {
		this._router.navigate([CpRoutes.RECIPE, id])
	}

}
