export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/home',
  MY_FOODS: '/my-foods',
  CREATE_FOOD: '/create-food',
  MY_MEALS: '/my-meals',
  CREATE_MEAL: '/create-meal',
  MEAL: '/meal/:id',
  UPDATE_MEAL: '/update-meal/:id',
};

export const navigationBarLinks = [
  {
    title: 'Home',
    path: ROUTES.HOME,
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
