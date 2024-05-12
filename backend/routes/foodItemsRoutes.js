const express = require('express');
const { ObjectId } = require('mongodb');
const { authToken } = require('../middlewares/authMiddleware');
const { handleError } = require('../validation/errorHandler');
const { foodItemSchema } = require('../validation/authValidationSchemas');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.post('/create-food', authToken, async (req, res) => {
  try {
    await foodItemSchema.validate(req.body, { abortEarly: false });
    const { name, valuesPer, kcal, fat, carbs, protein } = req.body;

    const existingFoodItem = await client
      .db(process.env.MONGO_DATABASE)
      .collection('foodItems')
      .findOne({
        userId: new ObjectId(`${req.user._id}`),
        name: name,
      });

    if (existingFoodItem) {
      return res.status(400).send({ message: 'Food item already exists.' });
    }

    const newFoodItem = {
      userId: new ObjectId(`${req.user._id}`),
      name,
      valuesPer,
      kcal,
      fat,
      carbs,
      protein,
    };

    const response = await client.db(process.env.MONGO_DATABASE).collection('foodItems').insertOne(newFoodItem);
    newFoodItem._id = response.insertedId;

    console.log('Food item created:', newFoodItem);
    return res.status(201).send({ message: 'Food item added successfully.', data: newFoodItem });
  } catch (error) {
    console.error('Create food item error:', error);
    return handleError(res, error);
  }
});

router.get('/my-foods', authToken, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Attempting to retrieve food items for user ID:');
    const foodItems = await client
      .db(process.env.MONGO_DATABASE)
      .collection('foodItems')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    if (foodItems.length === 0) {
      return res.status(404).send({ message: 'No food items found.' });
    }

    return res.status(200).send({ message: 'Food items retrieved successfully.', data: foodItems });
  } catch (error) {
    console.error('Error retrieving food items:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

module.exports = router;
