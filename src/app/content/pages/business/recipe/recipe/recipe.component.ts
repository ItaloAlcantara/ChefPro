import { Messages } from './../../../../../core/constants/messages';
import { Unit } from './../../../../../core/models/business/unit';
import { UnitService } from './../../../../../core/services/business/unit.service';
import { ApiResponse } from './../../../../../core/models/api-response';
import { Recipe } from './../../../../../core/models/business/recipe';
import { CpLoadingService } from './../../../../../core/services/common/cp-loading.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../../../../../core/services/business/recipe.service';
import { CpRoutes } from '../../../../../core/constants/cp-routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpBaseComponent } from '../../../common/cp-base/cp-base.component';
import { RecipeCategory } from '../../../../../core/models/business/recipecategory';
import { FormArray } from '@angular/forms/src/model';
import { CpLocalStorageService } from '../../../../../core/services/common/cp-localstorage.service';
import { ToastrService } from 'ngx-toastr';
import { Ingredient } from '../../../../../core/models/business/ingredient';
import { IngredientService } from '../../../../../core/services/business/ingredient.service';
import { RecipeIngredient } from '../../../../../core/models/business/recipeingredient';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IngredientInfoComponent } from '../../ingredient/ingredient-info/ingredient-info.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'm-recipe',
	templateUrl: './recipe.component.html',
	styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent extends CpBaseComponent implements OnInit {

	private recipe: Recipe;
	categories: RecipeCategory[] = [];
	units: Unit[] = [];

	ingredients: RecipeIngredient[] = [];
	ingredientsQuery: Ingredient[] = [];

	private paramsSub: any;

	ingredientInfoRef: MatDialogRef<IngredientInfoComponent>;

	constructor(
		_cdr: ChangeDetectorRef,
		_loading: CpLoadingService,
		private _service: RecipeService,
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		private _unitService: UnitService,
		private _localStorage: CpLocalStorageService,
		private _ingredientService: IngredientService,
		private _toast: ToastrService,
		private _dialogIngredientInfo: MatDialog,
		private _translate: TranslateService,
	) {
		super(_loading, _cdr);
	}

	ngOnInit() {
		this.formGroup = this._formBuilder.group({
			name: [null, [Validators.required]],
			recipeCategory: [null, [Validators.required]],
			preparationTime: [null, [Validators.required]],
			unityQuantity: [null, [Validators.required]],
			unit: [null, [Validators.required]],
			description: [null, [Validators.required]],
			steps: this._formBuilder.array([]),
			financial: this._formBuilder.group({
				totalCostValue: [0, [Validators.required]],
				totalCostPerc: [0, [Validators.required]],
				costUnitValue: [0, [Validators.required]],
				costUnitPerc: [0, [Validators.required]]
			})
		});

		this.fetchCategories();
		this.fetchUnits();

		this.getRecipeParam();
	}

	fetchIngredients(name?: string) {
		if (name && name.trim() != '') {
			this._loading.show();
			this._ingredientService.getByUser(this._localStorage.getLoggedUser().id, {
				currentPage: this.pagination.currentPage,
				name
			}).subscribe((apiResponse: ApiResponse) => {
				this.ingredientsQuery = apiResponse.data;
				this.fillPaginationWithApiResponse(apiResponse);
				this._loading.hide();
			}, (apiResponse: ApiResponse) => {
				this._loading.hide();
			});
		} else {
			this.ingredientsQuery = [];
		}
	}

	getRecipeParam() {
		this.paramsSub = this._route.params.subscribe(params => {
			let id = +params['id'];
			if (id) {
				this._loading.show();
				this._service.getById(id).subscribe(
					apiResponse => {
						this.recipe = apiResponse.data;
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

	fillForm() {
		this.formGroup.patchValue({
			name: this.recipe.name,
			recipeCategory: this.recipe.recipeCategory,
			unityQuantity: this.recipe.unityQuantity,
			unit: this.recipe.unit,
			preparationTime: this.recipe.preparationTime,
			description: this.recipe.description
		});


		let financial = this.recipe.financial;
		if (financial) {
			this.formGroup.patchValue({
				financial: {
					totalCostValue: financial.totalCostValue ? financial.totalCostValue : 0,
					totalCostPerc: financial.totalCostPerc ? financial.totalCostPerc : 0,
					costUnitValue: financial.costUnitValue ? financial.costUnitValue : 0,
					costUnitPerc: financial.costUnitPerc ? financial.costUnitPerc : 0
				}
			});
		}

		if (this.recipe.steps.length > 0) {
			//Remover Step inicial
			this.recipe.steps.forEach((step) => {
				this.addStep(step.description);
			});
		}

		this.ingredients = this.recipe.ingredients;
		this.onChangeComponent();
	}

	fetchCategories() {
		this._service.getCategoriesReduced().subscribe(
			(apiResponse: ApiResponse) => {
				this.categories = apiResponse.data;
			},
			(apiResponse: ApiResponse) => { }
		)
	}

	fetchUnits() {
		this._unitService.getReduced().subscribe(
			(apiResponse: ApiResponse) => {
				this.units = apiResponse.data;
			},
			(apiResponse: ApiResponse) => { }
		)
	}

	cancel() {
		this._router.navigate([CpRoutes.RECIPES]);
	}

	save() {
		this._loading.show();
		this.formGroup.value.user = this._localStorage.getLoggedUser();
		this.formGroup.value.ingredients = this.ingredients;
		if (this.recipe && this.recipe.id) {
			this.formGroup.value.id = this.recipe.id;
			this._service.update(this.formGroup.value).subscribe(
				apiResponse => {
					this._loading.hide();
					this._toast.success(Messages.SUCCESS);
					this._router.navigate([CpRoutes.RECIPES]);
				},
				error => {
					this._loading.hide();
				}
			);
		} else {
			this._service.insert(this.formGroup.value).subscribe(
				apiResponse => {
					this._loading.hide();
					this._toast.success(Messages.SUCCESS);
					this._router.navigate([CpRoutes.RECIPES]);
				},
				error => {
					this._loading.hide();
				}
			);
		}
	}

	//Steps
	private stepControlName: string = "steps";

	createStep(order: number = 1, description?: String) {
		console.log('create');
		let form = this._formBuilder.group({
			order: [order, [Validators.required]],
			description: [description, [Validators.required]]
		});
		return form;
	}

	addStep(description?: String) {
		console.log('addStep');
		const control = this.formGroup.controls[this.stepControlName] as FormArray;
		control.push(this.createStep(control.length + 1, description));
	}

	removeStep(index: number) {
		const control = this.formGroup.controls[this.stepControlName] as FormArray;
		control.removeAt(index)
	}

	addIngredient(ingredient: Ingredient) {
		let price: number = 0;
		if (ingredient && ingredient.purchasePrice && ingredient.purchasePrice.price)
			price = ingredient.purchasePrice.price;
		this.ingredients.push({
			amount: 1,
			ingredient,
			unit: null,
			correctionFactor: {
				grossWeight: 1,
				netWeight: 1
			},
			purchasePrice: {
				price: 0,
				unit: null,
				unityQuantity: 0
			}
		});
		this.ingredientsQuery = [];
		this.onChangeComponent();
	}

	setIngredientInfo(index: number) {
		this.ingredientInfoRef = this._dialogIngredientInfo.open(IngredientInfoComponent, {
			data: {
				recipeIngredient: this.ingredients[index]
			}
		});
		this.ingredientInfoRef.afterClosed().subscribe(recipeIngredient => {
			if (!recipeIngredient) return;
			let riTemp: RecipeIngredient;
			riTemp = this.ingredients[index];
			riTemp.amount = recipeIngredient.amount,
				riTemp.unit = recipeIngredient.unit,
				riTemp.purchasePrice = recipeIngredient.purchasePrice,
				riTemp.correctionFactor = recipeIngredient.correctionFactor
			this.ingredients[index] = riTemp
			this.getTotalCost();
			this.onChangeComponent();
		});
		this.onChangeComponent();
	}

	getTotalIngredients(): number {
		return this.ingredients.map(ingred => {
			let ingredientPrice: number = 0.0;
			if (ingred.purchasePrice &&
				ingred.purchasePrice.price &&
				ingred.purchasePrice.price > 0 &&
				ingred.purchasePrice.unityQuantity) {
				ingredientPrice = ingred.purchasePrice.price / ingred.purchasePrice.unityQuantity;
			}

			if (ingred.amount) {
				ingredientPrice = ingredientPrice * ingred.amount;
			} else {
				ingredientPrice = 0.0;
			}

			return ingredientPrice
		}).reduce((a, b) => a + b, 0);
	}

	getTotalCost(): string {
		return this._translate.instant('RECIPE.TABS.FINANCIAL.TOTAL_COAST', { cost: this.getTotalIngredients() })
	}

	onChangeCostValue() {
		let recipe = this.formGroup.value;
		if (recipe && recipe.financial) {
			let costValue = this.formGroup.value.financial.totalCostValue;
			console.log(recipe);
			let totalCostPerc = 0.0;
			if (costValue && costValue > 0) {
				console.log(this.getTotalIngredients());
				totalCostPerc = ((costValue - this.getTotalIngredients()) / this.getTotalIngredients()) * 100
			}
				console.log(totalCostPerc);
			this.formGroup.patchValue({
				financial: {
					totalCostPerc: totalCostPerc
				}
			});
		}
		this.onChangeComponent();
	}

	onChangeCostPerc() {
		let recipe = this.formGroup.value;
		if (recipe && recipe.financial) {
			let costPerc = this.formGroup.value.financial.totalCostPerc;
			let totalCostValue = 0.0;
			if (costPerc && costPerc > 0)
				totalCostValue = (this.getTotalIngredients() + (costPerc * this.getTotalIngredients()) / 100)
			this.formGroup.patchValue({
				financial: {
					totalCostValue: totalCostValue
				}
			});
		}
		this.onChangeComponent();
	}

	onChangeCostUnitValue() {
		let recipe = this.formGroup.value;
		if (recipe && recipe.financial) {
			let costUnitValue = this.formGroup.value.financial.costUnitValue;
			let costUnitPerc = 0.0;
			if (costUnitValue && costUnitValue > 0)
				costUnitPerc = ((costUnitValue - this.getTotalIngredients()) / this.getTotalIngredients()) * 100;
			this.formGroup.patchValue({
				financial: {
					costUnitPerc: costUnitPerc
				}
			});
		}
		this.onChangeComponent();
	}

	onChangeCostUnitPerc() {
		let recipe = this.formGroup.value;
		if (recipe && recipe.financial) {
			let costUnitPerc = this.formGroup.value.financial.costUnitPerc;
			let costUnitValue = 0.0;
			if (costUnitPerc && costUnitPerc > 0)
				costUnitValue = (this.getTotalIngredients() + (costUnitPerc * this.getTotalIngredients()) / 100)
			this.formGroup.patchValue({
				financial: {
					costUnitValue: costUnitValue
				}
			});
		}
		this.onChangeComponent();
	}

}
