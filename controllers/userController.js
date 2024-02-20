const User = require('../model/userModel');

const userController = {};


userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({ err: 'Missing username or password' });
  }

  try {
    const user = await User.create({ username, password });
    res.locals.user_id = user._id;
    console.log('User created');
    return next();
  } catch (err) {
    return next({ err: 'Error in userController.createUser: ' + JSON.stringify(err) });
  }
};


userController.verifyUser = (req, res, next) => {
  if (req.cookies.cookieId) {
    console.log('User already logged in');
    return next();
  }

  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next('Error in userController.verifyUser: ' + JSON.stringify(err));
    }
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    res.locals.user_id = user._id;
    next();
  });
};


userController.deleteUser = (req, res, next) => {
  const { username } = req.params;
  User.findOneAndDelete({ username }, (err, user) => {
      if (err) {
        return next('Error in userController.deleteUser: '  + JSON.stringify(err));
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  });
};

userController.addUserLocation = (req, res, next) => {
  const userId = req.cookies.userId;
  const clickedState = req.body.clickedGeography;
  console.log('clickedState', clickedState)
  console.log(userId);

  User.findById(userId, (err, user) => {
    console.log('findById active')
    if (err) {
      console.log(err);
      res.status(500).send('Error occurred while finding user in addUserLocation middleware');
    } else if (user) {
      if (user.locations.includes(clickedState)) {
        res.status(400).send('Location already saved');
      } else {
        // Add clickedState to user's locations
        user.locations.push(clickedState);

        // Save the updated document
        user.save(err => {
          if (err) {
            console.log(err);
            res.status(500).send('Error occurred while saving user');
          } else {
            res.status(200).send('Location saved successfully!');
          }
        });
      }
    } else {
      res.status(404).send('User not found');
    }
  });
};

userController.updateUserLocation = (req, res, next) => {
  const { username } = req.params;
  const { newLocations } = req.body;
  User.findOneAndUpdate({ username }, { locations: newLocations }, { new: true }, (err, user) => {
    if (err) {
      return next('Error in userController.updateUser: '  + JSON.stringify(err));
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }
    res.status(200).json(user);
  });
};


module.exports = userController;