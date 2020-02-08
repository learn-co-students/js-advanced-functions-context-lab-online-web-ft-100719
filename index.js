/* Your Code Here */
function createEmployeeRecord(employeeRecord) {
    const timeIns = []
    const timeOuts = []
    const record = {
        firstName: employeeRecord[0],
        familyName: employeeRecord[1],
        title: employeeRecord[2],
        payPerHour: employeeRecord[3],
        timeInEvents: timeIns,
        timeOutEvents: timeOuts
    }
    return record
}

function createEmployeeRecords(employeeRecords) {
    return employeeRecords.map(record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent (dateStamp) {
    const dateHour = dateStamp.split(' ')
    const timeInObject = {
        type: 'TimeIn',
        hour: parseInt(dateHour[1], 10),
        date: dateHour[0],
    }
    this.timeInEvents.push(timeInObject)
    return this
}

function createTimeOutEvent (dateStamp) {
    const dateHour = dateStamp.split(' ')
    const timeOutObject = {
        type: 'TimeOut',
        hour: parseInt(dateHour[1], 10),
        date: dateHour[0],
    }
    this.timeOutEvents.push(timeOutObject)
    return this
}

function hoursWorkedOnDate (workDate) {
    const timeIn = this.timeInEvents.find(event => event.date === workDate).hour
    const timeOut = this.timeOutEvents.find(event => event.date === workDate).hour

    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate (workDate) {
    return hoursWorkedOnDate.call(this, workDate) * this.payPerHour
}

// function allWagesFor (employeeRecord) {
//     const wages = employeeRecord.timeInEvents.map(event => wagesEarnedOnDate(employeeRecord, event.date))
//     const totalWages = (wage, startValue) => wage + startValue
//     return wages.reduce(totalWages)
// }

function findEmployeeByFirstName (employeeRecords, name) {
    return employeeRecords.find(record => record.firstName === name)
}

function calculatePayroll (employeeRecords) {
    const wages = employeeRecords.map(record => allWagesFor.call(record))
    const totalWages = (wage, startValue) => wage + startValue 
    return wages.reduce(totalWages)
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