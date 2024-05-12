const yup = require('yup');

const foodItemSchema = yup.object().shape({
  name: yup.string().required(),
  valuesPer: yup.number().required(),
  kcal: yup.number().required(),
  fat: yup.number().required(),
  carbs: yup.number().required(),
  protein: yup.number().required(),
});

module.exports = {
  foodItemSchema,
};
