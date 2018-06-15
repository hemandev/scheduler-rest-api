const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const validator = require('../validators/validators')
const dayToArray = require('../utils/utils').stringToArray


router.route('/')

  .post((req, res) => {

    const schedule = {
      name: req.body.name,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      days: req.body.days,
    }

    const email = req.body.email

    if(validator.nameValidator(schedule.name)
      && validator.timeValidator(schedule.startTime)
      && validator.timeValidator(schedule.endTime)
      &&validator.dateRangeValidator(schedule.startTime, schedule.endTime)
      && validator.dayArrayValidator(schedule.days)
      && validator.nameValidator(email)) {

      User.findOne({email}, (err, user) => {

        console.log(user)

        if (err || user === null)
          res.json({message: "User dosen't exist!", status: false})
        else {

          console.log(user)

          user.schedule = schedule
          user.save(err => {
            if (err)
              res.send(err)
            else
              res.json({message: 'schedule created!', status: true})


          })
        }

      })

    }

    else
      res.json({status: false, message: "failed"})

  })


  .get((req, res) => {


    User.findOne({email: 'anand@gmail.com'}, (err, user) => {


      if (user.schedule.name.length > 0)

        res.json({status: true, schedule: user.schedule})

      else
        res.json({message: 'No schedule found', status: false})

    })


  })


module.exports = router
