import { CPCommonComponentsModule } from './../../../components/common/cp-common-components.module';
import { CommonServiceModule } from './../../../../../core/services/common/common-service.module';
import { MatCheckboxModule, MatIconModule, MatOptionModule, MatSelectModule, MatListModule, MatCardModule, MatDividerModule, MatDialogModule } from '@angular/material';
import { LayoutModule } from './../../../../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { MetronicCoreModule } from '../../../../../core/metronic/metronic-core.module';
import { PartialsModule } from '../../../../partials/partials.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientInfoModule } from '../../ingredient/ingredient-info/ingredient-info.module';
import { CurrencyMaskModule } from "ng2-currency-mask";

const routes: Routes = [
	{
		path: '',
		component: RecipeComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		MetronicCoreModule,
		LayoutModule,
		PartialsModule,
		AngularEditorModule,
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatIconModule,
		MatOptionModule,
		MatSelectModule,
		MatListModule,
        MatCardModule,
		MatDividerModule,
		MatDialogModule,
		NgbPaginationModule,
		ReactiveFormsModule,
		CommonServiceModule,
		ReactiveFormsModule,
		CPCommonComponentsModule,
		IngredientInfoModule,
		CurrencyMaskModule,
		NgbModule.forRoot(),
		TranslateModule.forChild(),
		RouterModule.forChild(routes),
	],
	declarations: [
		RecipeComponent
	]
})
export class RecipeModule { }
