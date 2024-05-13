const yup = require('yup');

const mealSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required.')
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must not exceed 50 characters.'),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        amount: yup.number().required().positive('Amount must be a positive number.'),
        unit: yup.string().required(),
      }),
    )
    .required(),
  description: yup.string().required(),
  calories: yup.number().required(),
  servings: yup.number().required(),
  photo: yup.string().url().nullable(),
});

module.exports = {
  mealSchema,
};
