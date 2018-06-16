const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const moment = require('moment')
const utils = require('../utils/utils')
const validator = require('../validators/validators')

router.route('/')

  .post((req, res) => {


    const task = {
      name: req.body.name,
      duration: req.body.duration,
      startDateTime: req.body.startDateTime,


    }

    const email = req.body.email

    if (validator.nameValidator(task.name)
      && validator.dateTimeValidator(task.startDateTime)
      && validator.durationValidator(task.duration)
      && validator.isInt(task.duration)
      && validator.nameValidator(email)) {


      User.findOne({email}, (err, user) => {


        if (err || user.schedule.name.length <= 0) {

          res.json({status: false, message: 'failed'})


        }

        else {
        //  console.log("inside else")
          const schedule = user.schedule

          const result = findEndDate(task, schedule)

          if (result.status === false)
            res.json({status: false, message: 'Task cannot be scheduled for this time'})


          else {

            task.endDateTime = result.finalDate
            task.workingHours = user.schedule.startTime + "-" + user.schedule.endTime
            user.tasks = user.tasks.concat([task])
            user.save(err => {
              if (err)
                res.send(err)
              else
                res.json({message: 'task created!', status: true, finalDate: result.finalDate})


            })


          }


        }

      })

    }

    else {

      res.json({status: false, message: "failed"})
    }


  })


  .get((req, res) => {


    User.findOne({email: 'anand@gmail.com'}, (err, user) => {


   //   console.log("length" + user.tasks.length)

      if (user.tasks.length > 0) {


        res.json({status: true, tasks: user.tasks})

      }

      else
        res.json({message: 'No tasks found', status: 'false'})

    })


  })


function findEndDate(task, schedule) {


  workingDays = utils.stringToArray(schedule.days)

//  console.log(workingDays)

  const startTime = moment.utc(schedule.startTime, 'HH:mm:ss')
  const endTime = moment.utc(schedule.endTime, 'HH:mm:ss')
  const taskStartDateTime = moment(task.startDateTime)
  const taskStartTime = moment.utc(task.startDateTime.substring(11), 'HH:mm:ss')
  const duration = parseInt(task.duration)
  const workHoursInSeconds = utils.timeDifferenceInSeconds(schedule.endTime, schedule.startTime)
  const durationInSeconds = workHoursInSeconds * duration
  const lateWorkDurationInSeconds = utils.timeDifferenceInSeconds(schedule.endTime, task.startDateTime.substring(11))

 // console.log("taskStartTime: " + taskStartTime + "duration: " + durationInSeconds + "workHours: " + workHoursInSeconds + "lateWork: " + lateWorkDurationInSeconds)

  let newDate = moment(taskStartDateTime.format('YYYY-MM-DD'))
  let i = duration

  let durationVariable = durationInSeconds
  let isFirstTime = true


  while (i > 0) {

  //  console.log(newDate.weekday())

    if (workingDays.includes(newDate.weekday())) {


      if (taskStartTime.isSameOrBefore(startTime)) {


        finalDate = newDate.format('YYYY-MM-DD') + " " + endTime.format('HH:mm:ss')
        newDate = newDate.add(1, 'days')


      }

      else if (taskStartTime.isSameOrAfter(endTime)) {

        newDate = newDate.add(1, 'days')
        finalDate = newDate.format('YYYY-MM-DD') + " " + endTime.format('HH:mm:ss')


      }

      else {

        i = 1000

     //   console.log("inside between")

        if (isFirstTime) {


        //  console.log("first time")

          isFirstTime = false
          newDate = newDate.add(1, 'days')
          durationVariable -= lateWorkDurationInSeconds


      //    console.log(durationVariable)
        }

        else {


     //     console.log("not first time")

          if ((durationVariable - workHoursInSeconds) <= 0) {

            console.log("less than")

            let finalTime = startTime.add(durationVariable, 'seconds')
            finalDate = newDate.format('YYYY-MM-DD') + " " + finalTime.format('HH:mm:ss')
            break
          }

          else {

       //     console.log("greater than")

            newDate = newDate.add(1, 'days')
            durationVariable -= workHoursInSeconds

        //    console.log(durationVariable)


          }


        }


      }


      i = i - 1
    }

    else {
      newDate = newDate.add(1, 'days')
      isFirstTime = false
      finalDate = newDate.format('YYYY-MM-DD') + " " + endTime.format('HH:mm:ss')
    }


  }


 // console.log(finalDate)
  if(moment(finalDate, 'YYYY-MM-DD HH:mm:ss').isValid())
  return {status: true, finalDate}
  else
    return{status: false, message: "failed"}

}


module.exports = {router,findEndDate}
