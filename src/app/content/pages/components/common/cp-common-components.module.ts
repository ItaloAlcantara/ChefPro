import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from "@angular/common";
import { CpLoadingComponent } from "./loading/cp-loading.component";

@NgModule({
    declarations: [
        CpLoadingComponent
    ], imports: [
        NgxSpinnerModule,
        CommonModule
    ], exports: [
        CpLoadingComponent
    ]
})
export class CPCommonComponentsModule { }
