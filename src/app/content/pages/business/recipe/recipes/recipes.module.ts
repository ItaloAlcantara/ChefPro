import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { MetronicCoreModule } from '../../../../../core/metronic/metronic-core.module';
import { LayoutModule } from '../../../../layout/layout.module';
import { PartialsModule } from '../../../../partials/partials.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatListModule, MatCardModule, MatDividerModule, MatIconModule } from '@angular/material';
import { CPCommonComponentsModule } from '../../../components/common/cp-common-components.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
	MetronicCoreModule,
	LayoutModule,
	PartialsModule,
	AngularEditorModule,
	MatListModule,
	MatCardModule,
	MatDividerModule,
	MatIconModule,
	CPCommonComponentsModule,
	RouterModule.forChild(routes),
	TranslateModule.forChild()
  ],
  declarations: [RecipesComponent]
})
export class RecipesModule { }
