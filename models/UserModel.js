const validators = require('../validators/validators')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/schedulerDatabase')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    schedule: {
      name: {type:String, default: '', required: true,  validate:[validators.nameValidator, 'Enter a valid name'] },
      startTime: {type: String, required: true, validate:[validators.timeValidator, 'Enter a valid date'] },
      endTime: {type: String, required: true, validate:[validators.timeValidator, 'Enter a valid date'] },
      days: {type: String, required: true},
    },
    tasks: [{
      name:
        {type:String, default: '', required: true, validate:[validators.nameValidator, 'Enter a valid name']},
      duration: {type: Number, required: true, validate:[validators.durationValidator, 'Enter a valid duration'] },
      startDateTime: {type: String, required: true, validate:[validators.dateTimeValidator, 'Enter a valid date'] },
      endDateTime: {type: String, required: true, validate:[validators.dateTimeValidator, 'Enter a valid date'] },
      workingHours: String
    }],

  timestamp: {type: Date, default: Date.now},


})

userModel = mongoose.model('User', UserSchema)

module.exports = userModel



