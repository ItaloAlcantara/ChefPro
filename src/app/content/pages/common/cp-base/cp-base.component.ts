import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CpLoadingService } from '../../../../core/services/common/cp-loading.service';
import { CPPagination } from '../../../../core/models/common/cp-pagination';
import { ApiResponse } from '../../../../core/models/api-response';

@Component({
    selector: 'm-cp-base',
    templateUrl: './cp-base.component.html',
    styleUrls: ['./cp-base.component.scss']
})
export class CpBaseComponent implements OnInit {

    formGroup: FormGroup;

    pagination: CPPagination = new CPPagination();

    private _alertSubscription: Subscription;

    constructor(
        protected _loading: CpLoadingService,
		protected _cdr: ChangeDetectorRef
    ) {
        this._alertSubscription = this._loading.loadingHideEvent.subscribe( () => {
            this._cdr.detectChanges();
        });
    }

    ngOnInit() {
    }


	ngOnDestroy(): void {
        this._alertSubscription.unsubscribe();
    }
    
    protected fillPaginationWithApiResponse(apiResponse: ApiResponse) {
        this.pagination = {
            currentPage: apiResponse.currentPage,
            itensPerPage: apiResponse.itensPerPage,
            totalPages: apiResponse.totalPages
        };
    }

    protected getFieldErrors(fieldName: string) {
        return this.getField(fieldName).errors;
    }

    protected getField(fieldName: string) {
        return this.formGroup.get(fieldName);
    }

    compareSelect(value1: any, value2: any): boolean {
        return value1 && value2 ? value1.id === value2.id : value1 === value2;
    }

    protected onChangeComponent() {
        this._cdr.detectChanges();
    }

}
