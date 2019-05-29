import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { CpLocalStorageService } from '../../../../../core/services/common/cp-localstorage.service';
import swal from 'sweetalert2';

@Component({
	selector: 'm-user-profile',
	templateUrl: './user-profile.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
	@HostBinding('class')
	// tslint:disable-next-line:max-line-length
	classes = 'm-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light';

	@HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';

	//TODO: Buscar foto do usuário
	@Input() avatar: string = 'http://placehold.it/100x100';
	@Input() avatarBg: SafeStyle = '';

	@ViewChild('mProfileDropdown') mProfileDropdown: ElementRef;

	constructor (
		private _router: Router,
		private sanitizer: DomSanitizer,
		private _localStorage: CpLocalStorageService
	) {}

	ngOnInit (): void {
		if (!this.avatarBg) {
			this.avatarBg = this.sanitizer.bypassSecurityTrustStyle('url(./assets/app/media/img/misc/user_profile_bg.jpg)');
		}
	}

	public logout () {
		swal('Confirmação', 'Você tem certeza?', 'question')
		swal({
			title: '',
			text: "Você tem certeza?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim',
			cancelButtonText: 'Não'
		  }).then((result) => {
			if (result.value) {
				this._localStorage.clearToken();
				this._router.navigate(['/app/login']);
			}
		  })
	}
}
