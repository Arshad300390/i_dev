const User = require('../models/User');

const retrieveUsers = async (req) => {
  try {
    let { limit, pagination } = req.query;

    let query = {}; // Empty query, could be extended for filters.
    let projection = {_v: 0}; // Return all fields, can customize.
    
    let options = {
      lean: true,
      sort: { _id: -1 },
      skip: !Number(pagination) ? 0: Number(pagination) * !Number(limit) ? 10: Number(limit),
      limit: !Number(limit) ? 10:  Number(limit),
    };

    // Query the users with the above options
    const users = await User.find(query, projection, options);
    // Get the total count of users for pagination
    const count = await User.countDocuments(query);

    return { users, count };
  } catch (error) {
    throw error;
  }
};

module.exports = { retrieveUsers };
