const client = require('../config/db');

const fetchUserWithFoodItems = async (email) => {
  try {
    const response = await client
      .db(process.env.MONGO_DATABASE)
      .collection('users')
      .aggregate([
        {
          $match: { email: email },
        },
        {
          $lookup: {
            from: 'foodItems',
            localField: '_id',
            foreignField: 'userId',
            as: 'foodItems',
          },
        },
      ])
      .toArray();

    return response.length ? response[0] : null;
  } catch (error) {
    throw new Error('Database operation failed');
  }
};

const userDataResponse = (user) => {
  const { _id, email, foodItems } = user;

  const formattedFoodItems = foodItems.map((item) => ({
    id: item._id,
    name: item.name,
    valuesPer: item.valuesPer,
    kcal: item.kcal,
    fat: item.fat,
    carbs: item.carbs,
    protein: item.protein,
  }));

  return {
    _id,
    email,
    foodItems: formattedFoodItems,
  };
};

const fetchUserWithMeals = async (userId) => {
  try {
    const meals = await client
      .db(process.env.MONGO_DATABASE)
      .collection('meals')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    return meals;
  } catch (error) {
    throw new Error('Database operation failed');
  }
};

module.exports = { fetchUserWithFoodItems, userDataResponse, fetchUserWithMeals };
