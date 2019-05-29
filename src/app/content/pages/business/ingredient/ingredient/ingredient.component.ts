import { Router, ActivatedRoute } from '@angular/router';
import { UnitService } from './../../../../../core/services/business/unit.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Ingredient } from '../../../../../core/models/business/ingredient';
import { CpBaseComponent } from '../../../common/cp-base/cp-base.component';
import { Unit } from '../../../../../core/models/business/unit';
import { IngredientCategory } from '../../../../../core/models/business/ingredientcategory';
import { IngredientService } from '../../../../../core/services/business/ingredient.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { CpLoadingService } from '../../../../../core/services/common/cp-loading.service';
import { CpLocalStorageService } from '../../../../../core/services/common/cp-localstorage.service';
import { CpRoutes } from '../../../../../core/constants/cp-routes';
import { Messages } from '../../../../../core/constants/messages';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'm-ingredient',
	templateUrl: './ingredient.component.html',
	styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent extends CpBaseComponent implements OnInit, OnDestroy {

	ingredient: Ingredient;

	units: Unit[] = [];
	categories: IngredientCategory[] = [];

	private paramsSub: any;

	constructor(
		_cdr: ChangeDetectorRef,
		_loading: CpLoadingService,
		private _service: IngredientService,
		private _unitService: UnitService,
		private _toast: ToastrService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _localStorage: CpLocalStorageService,
		private _route: ActivatedRoute,
	) {
		super(_loading, _cdr);
	}

	ngOnInit() {
		this.formGroup = this._formBuilder.group({
			name: [null, [
				Validators.required
			]],
			ingredientCategory: [null, [
				Validators.required
			]],
			purchasePrice: this._formBuilder.group({
				price: [null, [Validators.required]],
				unityQuantity: [null, [Validators.required]],
				unit: [null, [Validators.required]]
			}),
			unit: [null, [
				Validators.required
			]],
			description: [null, []]
		});

		this.fetchCategories();
		this.fetchUnits();

		this.paramsSub = this._route.params.subscribe(params => {
			let id = +params['id'];
			if (id) {
				this._loading.show();
				this._service.getById(id).subscribe(
					apiResponse => {
						this.ingredient = apiResponse.data;
						this.fillForm();
						this._loading.hide();
					},
					error => {
						this._loading.hide();
					}
				);
			}
		});
	}

	fillForm(): any {
		let purchPrice = this.ingredient.purchasePrice
		this.formGroup.patchValue({
			name: this.ingredient.name,
			ingredientCategory: this.ingredient.ingredientCategory,
			unit: this.ingredient.unit,
			description: this.ingredient.description
		});
		if (purchPrice) {
			this.formGroup.patchValue({
				purchasePrice: {
					price: purchPrice.price ? purchPrice.price : 0,
					unityQuantity: purchPrice.unityQuantity ? purchPrice.unityQuantity : 0,
					unit: purchPrice.unit
				}
			});
		}
	}

	ngOnDestroy(): void {
		this.paramsSub.unsubscribe();
	}

	save() {
		if (this.validate()) {
			this._loading.show();
			this.formGroup.value.user = this._localStorage.getLoggedUser();
			this.verifyPurchasePrice();
			if (this.ingredient && this.ingredient.id && this.ingredient.user) {
				this.formGroup.value.id = this.ingredient.id;
				this.formGroup.value.ingredientCopiedId = this.ingredient.ingredientCopiedId;
				this._service.update(this.formGroup.value).subscribe(
					apiResponse => {
						this._loading.hide();
						this._toast.success(Messages.SUCCESS);
						this._router.navigate([CpRoutes.INGREDIENTS]);
					},
					error => {
						this._loading.hide();
					}
				);
			} else {
				if (this.ingredient)
					this.formGroup.value.ingredientCopiedId = this.ingredient.id;
				this._service.insert(this.formGroup.value).subscribe(
					apiResponse => {
						this._loading.hide();
						this._toast.success(Messages.SUCCESS);
						this._router.navigate([CpRoutes.INGREDIENTS]);
					},
					error => {
						this._loading.hide();
					}
				);
			}
		}
	}

	validate(): Boolean {
		//if (this.formGroup.valid) {
			return true;
//		}
/*
		let errors: any = [];
		let nameErros = this.getFieldErrors('name');
		let ingredientCategoryErros = this.getFieldErrors('ingredientCategory');
		if (nameErros && nameErros.required) {
			errors.push(this._translate.instant('VALIDATION.REQUIRED', { name: this._translate.instant('INGREDIENT.INPUT.NAME') }));
		}

		if (ingredientCategoryErros && ingredientCategoryErros.required) {
			errors.push(this._translate.instant('VALIDATION.REQUIRED', { name: this._translate.instant('INGREDIENT.INPUT.CATEGORY') }));
		}

		
		if (errors.length > 0) {
			this._toast.warning(errors.map(e => e.concat(" </br> ")).join(), "Tchorisco", {enableHTML: true});
		}

		return false;*/

	}
	verifyPurchasePrice() {
		let purchasePrice = this.formGroup.value.purchasePrice;
		if (purchasePrice &&
			!purchasePrice.price &&
			!purchasePrice.unityQuantity &&
			!purchasePrice.unit
		) {
			this.formGroup.value.purchasePrice = null
		}

	}

	cancel() {
		this._router.navigate([CpRoutes.INGREDIENTS]);
	}

	fetchCategories() {
		this._service.getCategoriesReduced().subscribe(
			apiResponse => {
				this.categories = apiResponse.data;
			},
			error => { }
		)
	}

	fetchUnits() {
		this._unitService.getReduced().subscribe(
			apiResponse => {
				this.units = apiResponse.data;
			},
			error => { }
		)
	}

}
