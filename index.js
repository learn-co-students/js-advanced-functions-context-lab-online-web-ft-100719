/* Your Code Here */

function createEmployeeRecord(info){
  return {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: []

  }
}

function createEmployeeRecords(array){
  return array.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = dateStamp.split(' ')[1]

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time,10),
  date
  })
  return this
}

function createTimeOutEvent(dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = dateStamp.split(' ')[1]

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time,10),
    date
  })
  return this
}

function hoursWorkedOnDate(dateOf){
  let inEvent = this.timeInEvents.find(function(e){
    return e.date === dateOf
  })

  let outEvent = this.timeOutEvents.find(function(e){
    return e.date === dateOf
  })
  let hoursWorked = (outEvent.hour - inEvent.hour)/100
  return hoursWorked
}

function wagesEarnedOnDate(dateOf){
  let wage = hoursWorkedOnDate.call(this, dateOf) * this.payPerHour
  let intWage = parseInt(wage, 10)
  return intWage
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
