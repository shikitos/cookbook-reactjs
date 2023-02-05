export const navElements = [
    {
        title: "Recipes",
        href: "#recipes",
        submenu: [
            {
                name: "Filter",
                href: "recipes",
            }, 
            {
                name: "Index",
                href: "recipes/index",
            }, {
                name: "Latest",
                href: "blog",
            }, {
                name: "Popular",
                href: "tags/most-popular",
            }
        ]
    },
    {
        title: "Course",
        href: "#course",
        submenu: [
            {
                name: "Appetizer",
                href: "categories/recipes/appetizer/",
            },
            {
                name: "Beverage",
                href: "categories/recipes/beverage/",
            },
            {
                name: "Breakfast",
                href: "categories/recipes/breakfast/",
            },
            {
                name: "Dessert",
                href: "categories/recipes/dessert/",
            },
            {
                name: "Main Dish",
                href: "categories/recipes/entree/",
            },
            {
                name: "Salad",
                href: "categories/recipes/salad/",
            },
            {
                name: "Side Dish",
                href: "categories/recipes/side/",
            },
            {
                name: "Snack",
                href: "categories/recipes/snack/",
            },
            {
                name: "Soup + Stew",
                href: "categories/recipes/soup-stew/",
            }
        ]
    },
    {
        title: "Dietary",
        href: "#dietary",
        submenu: [
            {
                name: "Gluten-Free",
                href: "tags/gluten-free/",
            },
            {
                name: "Vegan",
                href: "tags/vegan/",
            },
            {
                name: "Vegan/Vegetarian",
                href: "tags/vegan-adaptable/",
            },
            {
                name: "Vegetarian",
                href: "tags/vegetarian/",
            }
        ]
    },
    {
        title: "Ingredient",
        href: "#ingredient",
        submenu: [
            {
                name: "Bean",
                href: "tags/bean/",
            },
            {
                name: "Beef",
                href: "tags/beef/",
            },
            {
                name: "Chicken",
                href: "tags/chicken/",
            },
            {
                name: "Chocolate",
                href: "tags/chocolate/",
            },
            {
                name: "Egg",
                href: "tags/egg/",
            },
            {
                name: "Fruit",
                href: "tags/fruit/",
            },
            {
                name: "Matcha",
                href: "tags/matcha-green-tea/",
            },
            {
                name: "Mashroom",
                href: "tags/mushroom/",
            },
            {
                name: "Pork",
                href: "tags/pork/",
            },
            {
                name: "Seafood",
                href: "tags/seafood/",
            },
            {
                name: "Tofu",
                href: "tags/tofu/",
            },
            {
                name: "Vegetable",
                href: "tags/vegetable/",
            }
        ]
    },
    {
        title: "Preparation",
        href: "#preparation",
        submenu: [
            {
                name: "Bento",
                href: "tags/bento/",
            },
            {
                name: "Easy",
                href: "tags/easy/",
            },
            {
                name: "Grill/BBQ/Smoke",
                href: "tags/grilling-bbq/",
            },
            {
                name: "Meal Prep",
                href: "tags/meal-prep/",
            },
            {
                name: "One-Pot/Pan",
                href: "tags/one-pot-one-pan/",
            },
            {
                name: "Pressure Cooker",
                href: "tags/pressure-cooker/",
            },
            {
                name: "Under 30 Minutes",
                href: "tags/under-30-minutes/",
            },
            {
                name: "Under 5 Ingredients",
                href: "tags/under-5-ingredients/",
            }
        ]
    },
    {
        title: "Dish Type",
        href: "#dish",
        submenu: [
            {
                name: "Bread",
                href: "tags/bread/",
            },
            {
                name: "Cake",
                href: "tags/cake/",
            },
            {
                name: "Casserole",
                href: "tags/casserole/",
            },
            {
                name: "Condiments",
                href: "tags/condiment-sauce/",
            },
            {
                name: "Dumplings",
                href: "tags/dumpling/",
            },
            {
                name: "Hot Pot",
                href: "tags/hot-pot/",
            },
            {
                name: "Noodle + Pasta",
                href: "#noodlepasta",
            },
            {
                name: "Party Food",
                href: "#partyfood",
            },
            {
                name: "Rice + Donb",
                href: "#ricedonb",
            },
            {
                name: "Sandwich",
                href: "#sandwich",
            },
            {
                name: "Simmered Food",
                href: "#simmeredfood",
            },
            {
                name: "Stir-Fry",
                href: "#stirfry",
            },
            {
                name: "Sushi",
                href: "#sushi",
            },
            {
                name: "Sweets",
                href: "#sweets",
            }
        ]
    },
];
  
export const exampleURLImage = "https://www.justonecookbook.com/wp-content/uploads/2022/08/Shio-Ramen-9507-III-400x600.jpg";

export const createRecipeTitles = {

    name: {
        titleValue: "Name of the dish",
        placeholder: "Set recipe's name...",
    },
    review: {
        titleValue: "review of the dish",
        placeholder: "Set recipe's name...",
    },
    preparationTime: {
        titleValue: "Total cooking time",
        placeholder: "Write total cooking time [format: 1 hour, 50 minutes]...",
    },
    ingredients: {
        titleValue: "Ingredients for the dish",
        placeholder: "Add ingredients for the dish [ingredient must be added in its own field]...",
    },
    tags: {
        titleValue: "Tags related to the recipe",
        placeholder: "Add tags [tags must be added in its own field]...",
    },
    instructions: {
        titleValue: "Cooking instructions",
        placeholder: "Add instructions to the dish [each field is a cooking step]...",
    },
    description: {
        titleValue: "Basic description of the dish",
        placeholder: "Write a basic description of the dish [this information will appear at the beginning of the recipe page]...",
    },
    nutrition: {
        titleValue: "Calories and nutrients in the recipe",
        placeholder: "Add the calories and nutrients of this meal [each field is one nutrient/calorie - e.g., protein: 5 g]...",
    },
    servings: {
        titleValue: "Servings",
        placeholder: "Add the number of servings of the dish [just a number - for example, 5]...",
    },
    urlIdName: {
        titleValue: "Name of route",
        placeholder: "Write the name in string format, it will be a route (url path) [just a string - for example, shio-ramen]...",
    },
    imageData: {
        titleValue: "Recipe cover image",
        placeholder: "Set recipe's name...",
    },
    howToStep: {
        titleValue: "Supplement, tips and instructions",
        placeholder: "Write your supplement, tips and instructions for the recipe [it must be HTML format, each block is one recipe block]..."
    }

}

export const editRecipeTitles = {

    _id: {
        titleValie: "Recipe's id",
        placeholder: "Here is should be recipe's id...",
    },
    name: {
        titleValue: "Name of the dish",
        placeholder: "Set recipe's name...",
    },
    howToStep: {
        titleValue: "Supplement, tips and instructions",
        placeholder: "Write your supplement, tips and instructions for the recipe [it must be HTML format, each block is one recipe block]..."
    },
    urlIdName: {
        titleValue: "Name of route",
        placeholder: "Write the name in string format, it will be a route (url path) [just a string - for example, shio-ramen]..",
    },
    review: {
        titleValue: "Review of the dish",
        placeholder: "Set recipe's name...",
    },
    preparationTime: {
        titleValue: "Total cooking time",
        placeholder: "Write total cooking time [format: 1 hour, 50 minutes]...",
    },
    ingredients: {
        titleValue: "Ingredients for the dish",
        placeholder: "Add ingredients for the dish [ingredient must be added in its own field]...",
    },
    tags: {
        titleValue: "Tags related to the recipe",
        placeholder: "Add tags [tags must be added in its own field]...",
    },
    instructions: {
        titleValue: "Cooking instructions",
        placeholder: "Add instructions to the dish [each field is a cooking step]...",
    },
    description: {
        titleValue: "Basic description of the dish",
        placeholder: "Write a basic description of the dish [this information will appear at the beginning of the recipe page]...",
    },
    nutrition: {
        titleValue: "Calories and nutrients in the recipe",
        placeholder: "Add the calories and nutrients of this meal [each field is one nutrient/calorie - e.g., protein: 5 g]...",
    },
    servings: {
        titleValue: "Number of servings",
        placeholder: "Add the number of servings of the dish [just a number - for example, 5]...",
    },
    image: {
        titleValue: "Recipe cover image",
        placeholder: "Set recipe's name...",
    },
    creationTime: {
        titleValue: "Recipe creation time",
        placeholder: "None",
    },
    categories: {
        titleValue: "Categories to which the recipe belongs",
        placeholder: "Add recipe's categories [categories must be added in its own field]...",
    },

}