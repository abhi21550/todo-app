const express = require('express');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');
const expressLayouts = require('express-ejs-layouts');
const database = require('./config/database'); // Import MongoDB configuration

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/mainLayout');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define route for the root URL
app.get('/', (req, res) => {
  res.redirect('/projects');
});

// Use project routes
app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
