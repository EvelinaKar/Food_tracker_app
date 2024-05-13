const express = require('express');
const { ObjectId } = require('mongodb');
const { authToken } = require('../middlewares/authMiddleware');
const { handleError } = require('../validation/errorHandler');
const { mealSchema } = require('../validation/mealValidationSchemas');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.post('/create-meal', authToken, async (req, res) => {
  try {
    const validatedData = await mealSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    let { photo, name, ingredients, description, calories, servings } = validatedData;

    calories = Number(calories);
    servings = Number(servings);

    const existingMeal = await client
      .db(process.env.MONGO_DATABASE)
      .collection('meals')
      .findOne({
        userId: new ObjectId(req.user._id),
        name: name,
      });

    if (existingMeal) {
      return res.status(400).send({ message: 'Meal with this name already exists.' });
    }

    const newMeal = {
      userId: new ObjectId(req.user._id),
      name,
      ingredients,
      description,
      calories,
      servings,
      photo,
    };

    await client.db(process.env.MONGO_DATABASE).collection('meals').insertOne(newMeal);
    return res.status(201).send({ message: 'Meal added successfully.', data: newMeal });
  } catch (error) {
    console.error('Create meal error:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.get('/my-meals', authToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const meals = await client
      .db(process.env.MONGO_DATABASE)
      .collection('meals')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    if (meals.length === 0) {
      return res.status(404).send({ message: 'No meals found.' });
    }

    return res.status(200).send({ message: 'Meals retrieved successfully.', data: meals });
  } catch (error) {
    console.error('Error retrieving meals:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

module.exports = router;
