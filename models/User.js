// require the mongoose module
const mongoose = require('mongoose');
// define a schema
const Schema = mongoose.Schema;

// create the schema
const userSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  usertype: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// create a model
mongoose.model('usersCollection', userSchema);