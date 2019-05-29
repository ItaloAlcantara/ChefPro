import { IngredientsComponent } from './business/ingredient/ingredients/ingredients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { InnerComponent } from "./components/inner/inner.component";

const routes: Routes = [
	{
		path: '',
		component: PagesComponent, children: [
			{
				path: '',
				loadChildren: './business/business-pages.module#BusinessPagesModule'
			},
			{
				path: 'builder',
				loadChildren: './builder/builder.module#BuilderModule'
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path: 'inner',
				component: InnerComponent
			},
		]
	},
	{
		path: 'login',
		loadChildren: './auth/auth.module#AuthModule'
	},
	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
