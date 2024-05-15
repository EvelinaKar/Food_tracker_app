const yup = require('yup');

const mealSchema = yup.object().shape({
  breakfast: yup.array().of(yup.string().required()).required(),
  lunch: yup.array().of(yup.string().required()).required(),
  dinner: yup.array().of(yup.string().required()).required(),
});

const daySchema = yup.object().shape({
  meals: mealSchema.required(),
  notes: yup.string().optional(),
});

const mealPlanSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().optional(),
  days: yup.array().of(daySchema).required('Days are required'),
});

module.exports = { mealPlanSchema };
