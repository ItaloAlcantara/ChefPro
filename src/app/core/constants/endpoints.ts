const PACKAGE = {
    SECURITY: "/security",
    BUSINESS: "/business"
};

export const ENDPOINTS = {

    SECURITY: {
        LOGIN: "/login",
        USER: `${PACKAGE.SECURITY}/user`
	},

	BUSINESS: {
		INGREDIENTS: `${PACKAGE.BUSINESS}/ingredient`,
		INGREDIENT_CATEGORIES_REDUCED: `${PACKAGE.BUSINESS}/ingredient-category/reduced`,
		UNITS_REDUCED: `${PACKAGE.BUSINESS}/unit/reduced`,
        REGION: `${PACKAGE.BUSINESS}/region`,
		RECIPES: `${PACKAGE.BUSINESS}/recipe`,
		RECIPE_CATEGORIES_REDUCED: `${PACKAGE.BUSINESS}/recipe-category/reduced`,
		MENUS: `${PACKAGE.BUSINESS}/menu`,
	}

}
