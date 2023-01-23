const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('../backend/middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/entries', require('./routes/entriesRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
