import { NgModule } from "@angular/core";
import { IngredientInfoComponent } from "./ingredient-info.component";
import { CommonModule } from "@angular/common";
import { MetronicCoreModule } from "../../../../../core/metronic/metronic-core.module";
import { LayoutModule } from "@angular/cdk/layout";
import { PartialsModule } from "../../../../partials/partials.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonServiceModule } from "../../../../../core/services/common/common-service.module";
import { CPCommonComponentsModule } from "../../../components/common/cp-common-components.module";
import { TranslateModule } from "@ngx-translate/core";
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
    imports: [
        CommonModule,
        MetronicCoreModule,
        LayoutModule,
        PartialsModule,
        AngularEditorModule,
        ReactiveFormsModule,
        CommonServiceModule,
        CPCommonComponentsModule,
        CurrencyMaskModule,
        TranslateModule.forChild()
    ],
    declarations: [
        IngredientInfoComponent
    ],
    entryComponents: [
        IngredientInfoComponent
    ]
})
export class IngredientInfoModule { }