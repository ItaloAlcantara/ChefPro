import { CPCommonComponentsModule } from './components/common/cp-common-components.module';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PartialsModule } from '../partials/partials.module';
import { ProfileComponent } from './header/profile/profile.component';
import { MetronicCoreModule } from '../../core/metronic/metronic-core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { InnerComponent } from './components/inner/inner.component';
import { MatListModule, MatCardModule, MatDividerModule, MatLabel, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BusinessServiceModule } from '../../core/services/business/business-service.module';
import { CpBaseComponent } from './common/cp-base/cp-base.component';

@NgModule({
	declarations: [
		PagesComponent,
		ProfileComponent,
		ErrorPageComponent,
		InnerComponent,
		CpBaseComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		MetronicCoreModule,
		LayoutModule,
		PartialsModule,
		AngularEditorModule,
		MatListModule,
		MatCardModule,
		MatDividerModule,
		MatIconModule,
		CPCommonComponentsModule,
		BusinessServiceModule,
		MatFormFieldModule,
		MatInputModule
	],
	providers: [

	]
})
export class PagesModule {
}
