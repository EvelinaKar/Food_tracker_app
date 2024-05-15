const express = require('express');
const { ObjectId } = require('mongodb');
const { authToken } = require('../middlewares/authMiddleware');
const { handleError } = require('../validation/errorHandler');
const { mealPlanSchema } = require('../validation/mealPlanValidationSchema');

require('dotenv').config();

const router = express.Router();
const client = require('../config/db');

router.get('/my-meal-plans', authToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const mealPlans = await client
      .db(process.env.MONGO_DATABASE)
      .collection('mealPlans')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    if (mealPlans.length === 0) {
      return res.status(404).send({ message: 'No meal plans found.' });
    }

    return res.status(200).send({ message: 'Meal plans retrieved successfully.', data: mealPlans });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.post('/create-meal-plan', authToken, async (req, res) => {
  try {
    const validatedData = await mealPlanSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { name, description, days } = validatedData;

    const newMealPlan = {
      userId: new ObjectId(req.user._id),
      name,
      description,
      days,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await client.db(process.env.MONGO_DATABASE).collection('mealPlans').insertOne(newMealPlan);
    return res.status(201).send({ message: 'Meal plan added successfully.', data: newMealPlan });
  } catch (error) {
    console.error('Validation or insertion error:', error);
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.get('/meal-plan/:id', authToken, async (req, res) => {
  try {
    const mealPlanId = new ObjectId(req.params.id);
    const mealPlan = await client.db(process.env.MONGO_DATABASE).collection('mealPlans').findOne({ _id: mealPlanId });

    if (!mealPlan) {
      return res.status(404).send({ message: 'Meal plan not found.' });
    }

    return res.status(200).send({ message: 'Meal plan retrieved successfully.', data: mealPlan });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.put('/update-meal-plan/:id', authToken, async (req, res) => {
  try {
    const validatedData = await mealPlanSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const mealPlanId = new ObjectId(req.params.id);
    const userId = new ObjectId(req.user._id);

    const updatedMealPlan = {
      ...validatedData,
      userId,
      updatedAt: new Date(),
    };

    const result = await client
      .db(process.env.MONGO_DATABASE)
      .collection('mealPlans')
      .updateOne({ _id: mealPlanId, userId }, { $set: updatedMealPlan });

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: 'Meal plan not found or not authorized to update.' });
    }

    return res.status(200).send({ message: 'Meal plan updated successfully.', data: updatedMealPlan });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

router.delete('/delete-meal-plan/:id', authToken, async (req, res) => {
  try {
    const mealPlanId = new ObjectId(req.params.id);
    const userId = new ObjectId(req.user._id);

    const result = await client.db(process.env.MONGO_DATABASE).collection('mealPlans').deleteOne({ _id: mealPlanId, userId });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: 'Meal plan not found or not authorized to delete.' });
    }

    return res.status(200).send({ message: 'Meal plan deleted successfully.' });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error', error: error.toString() });
  }
});

module.exports = router;
