require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productCltr = require('./app/controllers/products-cltr'); 
const configureDB=require('./config/db')
const app = express();
app.use(cors());
app.use(express.json());
const { checkSchema } = require('express-validator');

configureDB()


const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const userCltr = require('./app/controllers/user-cltr');
const authenticateUser = require('./app/middlewares/authenticateUser');



app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register);
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login);
app.get('/users/account', authenticateUser, userCltr.account);

app.get('/api/products/seed', productCltr.seedData);
app.get('/api/products', productCltr.listAllProducts);
app.get('/api/products/list', productCltr.listTransactions);
app.get('/api/products/statistics', productCltr.getStatistics);
app.get('/api/products/barchart', productCltr.getBarChart);
app.get('/api/products/piechart', productCltr.getPieChart);
app.get('/api/products/combined', productCltr.getCombinedData);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
