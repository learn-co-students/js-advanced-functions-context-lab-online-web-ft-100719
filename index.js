/* Your Code Here */

const createEmployeeRecord = (infoArr) =>{
    let employee = {
        firstName: infoArr[0],
        familyName: infoArr[1],
        title: infoArr[2],
        payPerHour: infoArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (employeeArr) =>{
    return employeeArr.map(employee => {
        return createEmployeeRecord(employee)
    })
}

const createTimeInEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(" ")
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(timeEvent)

    return this
}

const createTimeOutEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(" ")
    let timeEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(timeEvent)

    return this
}

const hoursWorkedOnDate = function(date){
    const checkDate = inputDate =>{
        return inputDate.date.match(date)
    }

    let timeIn = this.timeInEvents.find(checkDate)
    let timeOut = this.timeOutEvents.find(checkDate)
    let hourIn = parseInt(timeIn.hour)/100
    let hourOut = parseInt(timeOut.hour)/100

    let hoursWorked = hourOut - hourIn
    return hoursWorked

}

const wagesEarnedOnDate = function(date){
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

const calculatePayroll = function(employeeArr){
    return employeeArr.reduce(function(total, rec){
        return total + allWagesFor.call(rec)
    }, 0)
}

const findEmployeeByFirstName = function(employeeArray, firstName){
    const checkName = record =>{
        return record.firstName.match(firstName)
    }
    return employeeArray.find(checkName)
}