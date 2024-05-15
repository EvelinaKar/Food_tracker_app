export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  MY_FOODS: '/my-foods',
  CREATE_FOOD: '/create-food',
  MY_MEALS: '/my-meals',
  CREATE_MEAL: '/create-meal',
  MEAL: '/meal/:id',
  UPDATE_MEAL: '/update-meal/:id',
  DELETE_MEAL: '/delete-meal/:id',
  DELETE_FOOD: '/delete-food/:id',
  MY_MEAL_PLANS: '/my-meal-plans',
  CREATE_MEAL_PLAN: '/create-meal-plan',
  UPDATE_MEAL_PLAN: '/update-meal-plan/:id',
  DELETE_MEAL_PLAN: '/delete-meal-plan/:id',
};

export const navigationBarLinks = [
  {
    title: 'My Meal Plans',
    path: ROUTES.MY_MEAL_PLANS,
  },
  {
    title: 'My Meals',
    path: ROUTES.MY_MEALS,
  },
  {
    title: 'My Foods',
    path: ROUTES.MY_FOODS,
  },
];
