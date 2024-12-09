const express = require('express');
const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

// Login routes
router.route('/')
   .get(adminController.getLogin) // GET request for login
   .post(adminController.postLogin) // POST request for login

// Logout route
router.get('/logout', adminController.logout); // GET request for logout

// Change status route
router.post('/chnagestatus', adminController.postChnageStatus); // POST request to change status

// Add hotel routes
router.route('/addhotel')
      .get(adminController.getAddHotel) // GET request for the add hotel page
      .post(adminController.postAddHotel); // POST request to add hotel to DB

// Search routes
router.route('/search')
      .get(adminController.getSearch) // GET request for search
      .post(adminController.postSearch); // POST request for search

// Update routes
router.route('/update')
      .get(adminController.getAllRooms) // GET request to fetch and display all rooms
      .post(adminController.getUpdate); // POST request for update page

// Update previous data
router.route('/updateData')
      .post(adminController.updatePrevData); // POST request to update previous data

module.exports = router;
