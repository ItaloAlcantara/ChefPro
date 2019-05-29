import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const _pathLandpage: string = '../landpage/landpage.module#LandpageModule';

const routes: Routes = [
	{
		path: 'app', children: [
			{ path: '', loadChildren: 'app/content/pages/pages.module#PagesModule' }
		]/* , canActivate: [
			AuthGuard
		] */
	},
	{ path: '', loadChildren: _pathLandpage },
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
