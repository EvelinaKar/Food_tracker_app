const yup = require('yup');

const foodItemSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required.')
    .min(2, 'Name must be at least 2 characters long.')
    .max(50, 'Name must not exceed 50 characters.'),
  valuesPer: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .required('Values per 100g is required.')
    .positive('Values per 100g must be a positive number.')
    .integer('Values per 100g must be an integer.'),
  kcal: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .required('Caloric value is required.')
    .positive('Caloric value must be positive.')
    .integer('Caloric value must be an integer.'),
  fat: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .required('Fat content is required.')
    .positive('Fat content must be positive.')
    .integer('Fat content must be an integer.'),
  carbs: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .required('Carbohydrate content is required.')
    .positive('Carbohydrate content must be positive.')
    .integer('Carbohydrate content must be an integer.'),
  protein: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : Number(value)))
    .required('Protein content is required.')
    .positive('Protein content must be positive.')
    .integer('Protein content must be an integer.'),
});

module.exports = { foodItemSchema };
