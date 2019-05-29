import {
	Component,
	OnInit,
	Output,
	Input,
	ViewChild,
	OnDestroy,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	HostBinding
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as objectPath from 'object-path';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerButtonOptions } from '../../../partials/content/general/spinner-button/button-options.interface';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { AuthNoticeService } from '../../../../core/auth/auth-notice.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { CpRoutes } from '../../../../core/constants/cp-routes';
import { CpLocalStorageService } from '../../../../core/services/common/cp-localstorage.service';
import { CpLoadingService } from '../../../../core/services/common/cp-loading.service';
import { CpBaseComponent } from '../../common/cp-base/cp-base.component';

@Component({
	selector: 'm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends CpBaseComponent implements OnInit, OnDestroy {

	@HostBinding('class') classes: string = 'm-login__signin';

	@Output() actionChange = new Subject<string>();

	@Input() action: string;

	public loading = false;

	typePassword: string = 'password';

	hide = false;

	errors: any = [];

	spinner: SpinnerButtonOptions = {
		active: false,
		spinnerSize: 18,
		raised: true,
		buttonColor: 'primary',
		spinnerColor: 'accent',
		fullWidth: false
	};

	constructor(
		_cdr: ChangeDetectorRef,
		_loading: CpLoadingService,
		private router: Router,
		public authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private authService: AuthService,
		private storageService: CpLocalStorageService,
		private formBuilder: FormBuilder,
	) {
		super(_loading, _cdr);
	}

	ngOnInit(): void {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = ``;
			this.authNoticeService.setNotice(initialNotice, 'success');
		}

		this.formGroup = this.formBuilder.group({
			email: ['lucasrest@hotmail.com', [
				Validators.required,
				Validators.email
			]],
			password: ['123', [
				Validators.required,
				//TODO Remover após adaptar senha default na API
				//Validators.minLength(6)
			]]
		});
	}

	changeTypePassword() {
		if (this.hide) {
			this.typePassword = 'text';
		} else {
			this.typePassword = 'password';
		}
	}

	login() {
		this.spinner.active = true;
		if (this.validate()) {
			this._loading.show();
			this.authService.authenticate(this.formGroup.value)
				.subscribe((res) => {
					this.storageService.setToken(res.data);
					this.router.navigate([CpRoutes.HOME]);
					this.spinner.active = false;
					this._loading.hide();
				}, err => {
					this.spinner.active = false;					
					this.authNoticeService.setNotice(err.error, 'error');
					this._loading.hide();
				});
		}
	}



	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
	}

	validate() {
		this.authNoticeService.setNotice('');
		if (this.formGroup.valid) {
			return true;
		}

		this.errors = [];

		let emailErrors = this.getFieldErrors('email');
		let passwordErrors = this.getFieldErrors('password');
		if (emailErrors) {
			if (emailErrors.email) {
				this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
			}
			if (emailErrors.required) {
				this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', { name: this.translate.instant('AUTH.INPUT.EMAIL') }));
			}
		}

		if (passwordErrors) {
			if (passwordErrors.required) {
				this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', { name: this.translate.instant('AUTH.INPUT.PASSWORD') }));
			}
			if (passwordErrors.minlength) {
				this.errors.push(this.translate.instant('AUTH.VALIDATION.MIN_LENGTH', {
					name: this.translate.instant('AUTH.INPUT.PASSWORD'),
					min: passwordErrors.minlength.requiredLength
				}));
			}
		}
		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
		} 

		return false;
	}

	forgotPasswordPage(event: Event) {
		this.action = 'forgot-password';
		this.actionChange.next(this.action);
	}

	register(event: Event) {
		this.action = 'register';
		this.actionChange.next(this.action);
	}
}
