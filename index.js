/* Your Code Here */
let createEmployeeRecord = function(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function(array) {
    let records = array.map(employee => createEmployeeRecord(employee))
    return records
}

function createTimeObject(type, event) {
    let timeObject = {
        type: type,
        hour: parseInt(event.split(" ")[1]),
        date: event.split(" ")[0]
    }
    return timeObject
}

let createTimeInEvent = function(event) {
    let timeObject = createTimeObject("TimeIn", event)

    this.timeInEvents.push(timeObject)

    return this
}

let createTimeOutEvent = function(event) {
    let timeObject = createTimeObject("TimeOut", event)

    this.timeOutEvents.push(timeObject)

    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date)
    let timeOut = this.timeOutEvents.find(event => event.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)

    return this.payPerHour * hoursWorked
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, name) {
    return array.find(employee => employee.firstName == name)
}

function calculatePayroll(array) {
    let allWages = array.map(employee => allWagesFor.call(employee))

    return allWages.reduce((a, c) => a + c, 0)
}