const expect = require('chai').expect
const findEndDate = require('../routes/tasks').findEndDate
let mockSchedule = {name: 'Schedule', startTime: '08:00:00', endTime: '17:00:00', days: '1,2,3,4,5', email: 'anand@gmail.com'}

let mockTask1 = {name: 'Task #1', duration: 1, startDateTime: '2017-11-20 08:00:00', email: 'anand@gmail.com'}
let mockTask2 = {name: 'Task #2', duration: 2, startDateTime: '2017-11-20 08:00:00', email: 'anand@gmail.com'}
let mockTask3 = {name: 'Task #3', duration: 6, startDateTime: '2017-11-20 08:00:00', email: 'anand@gmail.com'}
let mockTask4 = {name: 'Task #4', duration: 1, startDateTime: '2017-11-20 10:00:00', email: 'anand@gmail.com'}
let mockTask5 = {name: 'Task #5', duration: 2, startDateTime: '2017-11-19 08:00:00', email: 'anand@gmail.com'}
let mockTask6 = {name: 'Task #6', duration: 2, startDateTime: '2017-11-19 10:00:00', email: 'anand@gmail.com'}

const endDate1 = '2017-11-20 17:00:00'
const endDate2 = '2017-11-21 17:00:00'
const endDate3 = '2017-11-27 17:00:00'
const endDate4 = '2017-11-21 10:00:00'
const endDate5 = '2017-11-21 17:00:00'
const endDate6 = '2017-11-21 17:00:00'

describe('To check if the end date is correct for a schedule from Monday to Friday between 08:00:00 and 17:00:00', () => {

  it('Should return correct end date', () => {

    expect(findEndDate(mockTask1, mockSchedule).finalDate).to.equal(endDate1)

  })

  it('Should return correct end date ', () => {

    expect(findEndDate(mockTask2, mockSchedule).finalDate).to.equal(endDate2)

  })

  it('Should return correct end date', () => {

    expect(findEndDate(mockTask3, mockSchedule).finalDate).to.equal(endDate3)

  })

  it('Should return correct end date ', () => {

    expect(findEndDate(mockTask4, mockSchedule).finalDate).to.equal(endDate4)

  })

  it('Should return correct end date', () => {

    expect(findEndDate(mockTask5, mockSchedule).finalDate).to.equal(endDate5)

  })

  it('Should return correct end date ', () => {

    expect(findEndDate(mockTask6, mockSchedule).finalDate).to.equal(endDate6)

  })


})
