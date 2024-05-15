const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const foodItemsRoutes = require('./routes/foodItemsRoutes');
const mealsRoutes = require('./routes/mealsRoutes');
const mealPlans = require('./routes/mealPlans');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', foodItemsRoutes);
app.use('/api', mealsRoutes);
app.use('/api', mealPlans);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
