import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CPProfileComponent } from "./profile/cp-profile.component";

const routes: Routes = [
    {
        path: '', children: [
            {
                path: '', loadChildren: '../../pages/components/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'perfil',
                component: CPProfileComponent
            },

            {
                path: 'ingrediente', loadChildren: './ingredient/ingredient/ingredient.module#IngredientModule'
            },
            {
                path: 'ingrediente/:id', loadChildren: './ingredient/ingredient/ingredient.module#IngredientModule'
            },
            {
                path: 'ingredientes', loadChildren: './ingredient/ingredients/ingredients.module#IngredientsModule'
            },

            {
                path: 'receita', loadChildren: './recipe/recipe/recipe.module#RecipeModule'
            },
            {
                path: 'receita/:id', loadChildren: './recipe/recipe/recipe.module#RecipeModule'
            },
            {
                path: 'receitas', loadChildren: './recipe/recipes/recipes.module#RecipesModule'
            },


            {
                path: 'cardapio', loadChildren: './menu/menu/menu.module#MenuModule'
            },
            {
                path: 'cardapio/:id', loadChildren: './menu/menu/menu.module#MenuModule'
            },
            {
                path: 'cardapios', loadChildren: './menu/menus/menus.module#MenusModule'
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BusinessPagesRoutingModule { }
