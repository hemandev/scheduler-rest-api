const moment = require('moment')

module.exports =

  {


    nameValidator(name) {

      return name != null && name.length > 0

    },

    daysValidator(days) {

      return days != null || days.length > 0

    },

    timeValidator(time) {

      return moment.utc(time, 'HH:mm:ss', true).isValid()

    },


    dateTimeValidator(datetime) {

      return moment(datetime, 'YYYY-MM-DD HH:mm:ss', true).isValid()

    },


    durationValidator(duration) {

      return !isNaN(duration)  && duration > 0

    },

    dateRangeValidator(startTime, endTime){

    return !moment.utc(this.endTime, 'HH:mm:ss').isSameOrBefore(moment.utc(this.startTime, 'HH:mm:ss'))

    },

    isInt(value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    },

    dayArrayValidator(days){

      if(days.length > 0){

        let dayArr = days.split(',')
        for(item of dayArr){
          if(!this.isInt(item))
            return false

        }

        return true


      }


    }

  }

