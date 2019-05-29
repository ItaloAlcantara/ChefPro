import { MenuDTO } from './../../../../../core/models/business/dto/menu-dto';
import { Router } from '@angular/router';
import { CpLoadingService } from './../../../../../core/services/common/cp-loading.service';
import { ApiResponse } from './../../../../../core/models/api-response';
import { MenuService } from './../../../../../core/services/business/menu.service';
import { Component, OnInit } from '@angular/core';
import { CpRoutes } from '../../../../../core/constants/cp-routes';

@Component({
	selector: 'm-menus',
	templateUrl: './menus.component.html',
	styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

	private menus: MenuDTO[];

	constructor(
		private _service: MenuService,
		private _loading: CpLoadingService,
        private _router: Router
	) { }

	ngOnInit() {
		this.fetchMenus()
	}

	fetchMenus() {
		this._service.get().subscribe(
			(apiResponse: ApiResponse) => {
				this.menus = apiResponse.data;
				console.log(this.menus);
			},
			error => {}
		)
	}

	new() {
		this._router.navigate([CpRoutes.MENU])
	}

	edit(id: number) {
		this._router.navigate([CpRoutes.MENU, id])
	}

}
