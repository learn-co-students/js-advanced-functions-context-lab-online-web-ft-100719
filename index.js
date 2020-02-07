const createEmployeeRecord = infoArray => {
    const employee = {
        firstName: infoArray[0],
        familyName: infoArray[1],
        title: infoArray[2],
        payPerHour: infoArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = employeesInfoArray => {
    return employeesInfoArray.map(employeeArray => createEmployeeRecord(employeeArray))
}

const createTimeInEvent = function(timeStamp) {
    const [date, hour] = timeStamp.split(" ")
    const timeEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(timeEvent)
    return this
}

const createTimeOutEvent = function(timeStamp) {
    const [date, hour] = timeStamp.split(" ")
    const timeEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(timeEvent)
    return this
}

const hoursWorkedOnDate = function(date) {
    const validateDate = inputDate => inputDate.date.match(date)
    const timeIn = this.timeInEvents.find(validateDate)
    const timeOut = this.timeOutEvents.find(validateDate)
    const hourIn = parseInt(timeIn.hour)/100
    const hourOut = parseInt(timeOut.hour)/100
    return hourOut - hourIn
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const calculatePayroll = employeesArray => {
    return employeesArray.reduce((total, cur) => total + allWagesFor.call(cur), 0)
}

const findEmployeeByFirstName = (employeesArray, firstName) => {
    return employeesArray.filter(employee => employee.firstName === firstName)[0]
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