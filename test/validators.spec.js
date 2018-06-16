const expect = require('chai').expect
const validators = require('../validators/validators')

describe("Name Validator function tests", () => {

  it("Should return true for a valid name", () => {

    const result = validators.nameValidator('Hemand')
    expect(result).to.be.true

  })

  it('should return false for an empty string', () => {

    const result = validators.nameValidator('')
    expect(result).to.be.false

  })

})

describe("To check if a time is in valid format  HH:mm:ss", () => {

  it("Should return true for a valid time", () => {

    const result = validators.timeValidator('10:00:00')
    expect(result).to.be.true

  })

  it("Should return false for an invalid time", () => {

    const result = validators.timeValidator('101:00:00')
    expect(result).to.be.false

  })



})
