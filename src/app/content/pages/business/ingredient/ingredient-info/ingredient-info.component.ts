import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RecipeIngredient } from '../../../../../core/models/business/recipeingredient';
import { UnitService } from '../../../../../core/services/business/unit.service';
import { ApiResponse } from '../../../../../core/models/api-response';
import { Unit } from '../../../../../core/models/business/unit';
import { CpBaseComponent } from '../../../common/cp-base/cp-base.component';
import { CpLoadingService } from '../../../../../core/services/common/cp-loading.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'm-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.scss']
})
export class IngredientInfoComponent extends CpBaseComponent implements OnInit {

  units: Unit[] = [];

  recipeIngredient: RecipeIngredient;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    _loading: CpLoadingService,
    _cdr: ChangeDetectorRef,
    private _dialog: MatDialogRef<IngredientInfoComponent>,
    private _formBuilder: FormBuilder,
    private _unitService: UnitService) {
    super(_loading, _cdr);
    this.recipeIngredient = data.recipeIngredient;
  }

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      amount: [null, [Validators.required]],
      unit: [null, [Validators.required]],
      purchasePrice: this._formBuilder.group({
        price: [null, [Validators.required]],
        unityQuantity: [null, [Validators.required]],
        unit: [null, [Validators.required]]
      }),
      correctionFactor: this._formBuilder.group({
        grossWeight: [null, [Validators.required]],
        netWeight: [null, [Validators.required]],
      })
    });

    this.fetchUnits();
    this.fillForm();
  }

  fillForm(): any {
    this.formGroup.patchValue({
      amount: this.recipeIngredient.amount,
      unit: this.recipeIngredient.unit,
      purchasePrice: this.recipeIngredient.purchasePrice,
      correctionFactor: this.recipeIngredient.correctionFactor
    });
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
	this._dialog.close();
  }

  save() {
    this._dialog.close(this.formGroup.value);
  }

}
