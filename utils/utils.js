module.exports = {

  stringToArray(days){

    const dayArr = days.split(',')
    let workingDays = []
    for(item of dayArr)
      workingDays.push(parseInt(item))


    console.log(workingDays)

    return workingDays

  }


}
