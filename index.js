/* Your Code Here */
function createEmployeeRecord(array) {
  let employee = {}
  employee.firstName = array[0]
  employee.familyName = array[1]
  employee.title = array[2]
  employee.payPerHour = array[3]
  employee.timeInEvents = []
  employee.timeOutEvents = []
  return employee
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(timeInString) {
  this.timeInEvents.push(createTimeEvent(timeInString, "TimeIn"))
  return this
}

function createTimeEvent(timeString, typeString) {
  return Object.assign(extractTimeData(timeString), { type: typeString })
}
function extractTimeData(timeString) {
  const timeArray = timeString.split(' ')
  return {
    date: timeArray[0],
    hour: parseInt(timeArray[1])
  }
}

function createTimeOutEvent(timeOutString) {
  this.timeOutEvents.push(createTimeEvent(timeOutString, "TimeOut"))
  return this
}

function hoursWorkedOnDate(date) {
  const timeInOnDate = this.timeInEvents.find(e => e.date === date)
  const timeOutOnDate = this.timeOutEvents.find(e => e.date === date)
  return (timeOutOnDate.hour - timeInOnDate.hour) / 100
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour
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

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0)
}

function findEmployeeByFirstName(arrayOfEmployees, employeeFirstName) {
  return arrayOfEmployees.find(e => e.firstName === employeeFirstName)
}