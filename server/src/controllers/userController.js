const User = require('../models/User');
const { retrieveUsers } = require('../utils/userUtils');

exports.createUser = async (req, res) => {
    try {
      const { name, phoneNumber, profileImage, about } = req.body;
  
      const user = new User({
        name,
        phoneNumber,
        profileImage,
        about
      });
  
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  };
  
  // Get all users
//   exports.getAllUsers = async (req, res) => {
//     try {
//       const users = await User.find();
//       res.json(users);
//     } catch (err) {
//       res.status(500).json({ message: 'Error fetching users' });
//     }
//   };
exports.getAllUsers = async(req, res) => {
  try {
    console.log('controller res', req.body)
    let response = await retrieveUsers(req)
    let message = 'Success';
    res.send({
      success: true,
      message: message,
      data: response
    })
  } catch (error) {
    console.log(error)
  }
}



  
  // Get user by ID
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  };
  
  // Update user
  exports.updateUser = async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error updating user' });
    }
  };
  
  // Delete user
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

  exports.verifyUser = async(req, res) => {
    try {
      console.log('req body', req.body)
      const { otp, user_id} = req.body
      if (otp !== '12356') {
        return res.status(400).json({ status: false, message: 'OTP invalid' });
      }
      const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Success response
    return res.json({ user, status: true, message: 'Success' });
    } catch (error) {
      console.log(error)
    }
  }