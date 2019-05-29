import { NgModule } from "@angular/core";
import { IngredientsComponent } from "./ingredients.component";
import { CommonModule } from "@angular/common";
import { MetronicCoreModule } from "../../../../../core/metronic/metronic-core.module";
import { LayoutModule } from "../../../../layout/layout.module";
import { PartialsModule } from "../../../../partials/partials.module";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { MatListModule, MatCardModule, MatIconModule, MatDividerModule } from "@angular/material";
import { Routes, RouterModule } from "@angular/router";
import { CPCommonComponentsModule } from "../../../components/common/cp-common-components.module";
import { TranslateModule } from "@ngx-translate/core";
import { NgbPagination, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
    {
        path: '',
        component: IngredientsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        MetronicCoreModule,
        LayoutModule,
        PartialsModule,
        AngularEditorModule,
        MatListModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        NgbPaginationModule,
        CPCommonComponentsModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild()
    ],
    declarations: [
        IngredientsComponent
    ]
})
export class IngredientsModule { }
