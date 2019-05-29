import { CPCommonComponentsModule } from './../../../components/common/cp-common-components.module';
import { NgModule } from "@angular/core";
import { IngredientComponent } from "./ingredient.component";
import { MetronicCoreModule } from "../../../../../core/metronic/metronic-core.module";
import { PartialsModule } from "../../../../partials/partials.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatOptionModule, MatSelectModule } from "@angular/material";
import { LayoutModule } from "../../../../layout/layout.module";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CommonServiceModule } from "../../../../../core/services/common/common-service.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
    {
        path: '',
        component: IngredientComponent
    },

];

@NgModule({
    imports: [
        CommonModule,
        MetronicCoreModule,
        LayoutModule,
        PartialsModule,
        AngularEditorModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonServiceModule,
        ReactiveFormsModule,
        CPCommonComponentsModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        IngredientComponent
    ]
})
export class IngredientModule { }
