import { Injectable, ChangeDetectorRef } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiResponse } from "../models/api-response";
import { HttpStatusCode } from "../constants/http-status-code";
import { ErrorMessages } from "../constants/error-messages";
import { ToastrService } from "ngx-toastr";
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { CpRoutes } from "../constants/cp-routes";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toast: ToastrService,
        private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((err, caught) => {
                let apiResponse: ApiResponse;
                if (err.error.message) {
                    apiResponse = err.error;
                } else {
                    apiResponse = {
                        status: err.status,
                        message: this.getMessage(err)
                    }
                }

                this.redirectToLoginIfDeniedAccess(err.status);

                if (apiResponse.errors)
                    this.toast.warning(this.getErrors(apiResponse));
                else
                    this.toast.error(apiResponse.message);

                return throwError(apiResponse);
            }) as any);
    }
    getErrors(apiResponse: ApiResponse): string {
        return apiResponse.errors.map( e => e.concat(" \n ")).join();
    }


    redirectToLoginIfDeniedAccess(status) {
        if (status == HttpStatusCode.UNAUTHORIZED ||
            status == HttpStatusCode.FORBIDDEN) {
            this.router.navigate([CpRoutes.LOGIN]);
        }
    }

    getMessage(err: any): string {
        console.log(err);
        if (err.message.includes(ErrorMessages.UNKNOWN_URL)) {
            return ErrorMessages.UNKNOWN_API;
        } else {
            return err.message;
        }

    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
