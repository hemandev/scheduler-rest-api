const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/schedulerDatabase')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    schedule: {
      name: {type:String, default: '',  },
      startTime: {type: String,  },
      endTime: {type: String,  },
      days: {type: String, },
    },
    tasks: [{
      name:
        {type:String, default: '', },
      duration: {type: Number,  },
      startDateTime: {type: String,  },
      endDateTime: {type: String,  },
      workingHours: String
    }],

  timestamp: {type: Date, default: Date.now},


})

userModel = mongoose.model('User', UserSchema)

module.exports = userModel



