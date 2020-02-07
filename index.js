let createEmployeeRecord = function (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (employees) {
    return employees.map(function (employee) {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function (time) {
    let timeTokens = time.split(" ")
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(timeTokens[1]),
        date: timeTokens[0]
    }
    this.timeInEvents.push(timeIn)
    return this
}

let createTimeOutEvent = function (time) {
    let timeTokens = time.split(" ")
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(timeTokens[1]),
        date: timeTokens[0]
    }
    this.timeOutEvents.push(timeOut)
    return this
}

let hoursWorkedOnDate = function (date) {
    let start = this.timeInEvents.find(time => time.date === date).hour
    let end = this.timeOutEvents.find(time => time.date === date).hour
    return (end - start) / 100
}

let wagesEarnedOnDate = function (date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

let calculatePayroll = function (employees) {
    return employees.reduce(function (memo, employee) {
        return memo + allWagesFor.call(employee)
    }, 0)
}

let findEmployeeByFirstName = function (employees, name) {
    return employees.find(employee => employee.firstName === name)
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