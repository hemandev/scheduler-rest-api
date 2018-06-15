const moment = require('moment')

module.exports = {

  stringToArray(days) {

    const dayArr = days.split(',')
    let workingDays = []
    for (item of dayArr)
      workingDays.push(parseInt(item))


    console.log(workingDays)

    return workingDays

  },

  timeDifferenceInSeconds(time1, time2) {

    return moment.utc(time1, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds') - moment.utc(time2, 'HH:mm:ss').diff(moment().startOf('day'), 'seconds')

  }

}
