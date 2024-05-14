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
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.get('/meal/:id', authToken, async (req, res) => {
  try {
    const mealId = new ObjectId(req.params.id);

    const meal = await client.db(process.env.MONGO_DATABASE).collection('meals').findOne({ _id: mealId });

    if (!meal) {
      return res.status(404).send({ message: 'Meal not found.' });
    }

    return res.status(200).send({ message: 'Meal retrieved successfully.', data: meal });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.put('/update-meal/:id', authToken, async (req, res) => {
  try {
    const validatedData = await mealSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    let { photo, name, ingredients, description, calories, servings } = validatedData;

    calories = Number(calories);
    servings = Number(servings);

    const mealId = new ObjectId(req.params.id);
    const userId = new ObjectId(req.user._id);

    const updatedMeal = {
      userId,
      name,
      ingredients,
      description,
      calories,
      servings,
      photo,
    };

    const result = await client
      .db(process.env.MONGO_DATABASE)
      .collection('meals')
      .updateOne({ _id: mealId, userId }, { $set: updatedMeal });

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: 'Meal not found or not authorized to update.' });
    }

    return res.status(200).send({ message: 'Meal updated successfully.', data: updatedMeal });
  } catch (error) {
    console.error('Update meal error:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

module.exports = router;
