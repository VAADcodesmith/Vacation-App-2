const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');


// Route for checking cookies
router.get('/check-cookie', cookieController.checkCookie, (req, res) => {
  res.status(200).json({ message: 'Cookie exists!' });
});

// Route for verifying a user
router.post('/login', userController.verifyUser, cookieController.checkCookie, cookieController.setCookie, (req, res) => {
  res.status(200).json({ message: 'Login successful', user: res.locals.user_id });
});

// Route for signing up a user
router.post('/signup', userController.createUser, cookieController.setCookie, (req, res) => {
  res.status(200).json({ message:'Sign up successful', userId: res.locals.user_id })
});

router.put('/map', cookieController.checkCookie, userController.addUserLocation, (req, res) => {
  return res.status(200).json({ message:'State added to user location', userId: res.locals.user_id });
});

// Route for updating a user
router.put('/:username', cookieController.checkCookie, userController.updateUserLocation, (req, res) => {
    res.status(200).json({message:'User updated', user:res.locals.user})
});

// Route for deleting a user
router.delete('/:username', cookieController.checkCookie, userController.deleteUser, (req, res) => {
    res.status(200).json({message: 'User deleted'})
});


module.exports = router;