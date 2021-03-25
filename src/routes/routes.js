const express = require('express');

const routes = express.Router();

const EmployeeController = require('../controllers/employeeController');
const SessionController = require('../controllers/sessionController');

routes.get('/login', SessionController.login);
routes.post('/create/employee', EmployeeController.create);
routes.get('/search/employee', EmployeeController.searchForEmployee);
routes.get('/search/allTheEmployees', EmployeeController.listAllEmployees);
routes.put('/update/employee/:id', EmployeeController.updateEmployee);
routes.delete('/delete/employee', EmployeeController.deleteEmployee);
module.exports = routes;
