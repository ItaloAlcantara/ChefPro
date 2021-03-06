import { filter } from 'rxjs/operators';
import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslationService } from '../../../../../core/metronic/services/translation.service';

interface LanguageFlag {
	lang: string;
	country: string;
	flag: string;
	active?: boolean;
}

@Component({
	selector: 'm-language-selector',
	templateUrl: './language-selector.component.html',
	styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
	// tslint:disable-next-line:max-line-length
	@HostBinding('class') classes = 'm-nav__item m-topbar__languages m-dropdown m-dropdown--small m-dropdown--arrow m-dropdown--align-right m-dropdown--header-bg-fill m-dropdown--mobile-full-width';
	@HostBinding('attr.m-dropdown-toggle') mDropdownToggle = 'click';
	language: LanguageFlag;
	languages: LanguageFlag[] = [
		{
			lang: 'pt',
			country: 'Brasil',
			flag: 'assets/app/media/img/flags/011-brazil.svg'
		},
		{
			lang: 'en',
			country: 'USA',
			flag: 'assets/app/media/img/flags/020-flag.svg'
		},
		{
			lang: 'es',
			country: 'Spain',
			flag: 'assets/app/media/img/flags/016-spain.svg'
		}
	];

	constructor(
		private translationService: TranslationService,
		private router: Router,
		private el: ElementRef
	) {}

	ngOnInit() {
		this.setSelectedLanguage();
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(event => {
				this.setSelectedLanguage();
			});
	}

	setLanguage(lang) {
		this.languages.forEach((language: LanguageFlag) => {
			if (language.lang === lang) {
				language.active = true;
				this.language = language;
			} else {
				language.active = false;
			}
		});
		this.translationService.setLanguage(lang);

		(<DOMTokenList>this.el.nativeElement.classList).remove('m-dropdown--open');
	}

	setSelectedLanguage(): any {
		this.translationService.getSelectedLanguage().subscribe(lang => {
			if (lang) {
				setTimeout(() => {
					this.setLanguage(lang);
				});
			}
		});
	}
}
