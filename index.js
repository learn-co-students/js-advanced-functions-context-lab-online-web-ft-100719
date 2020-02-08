/* Your Code Here */

let createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


let createEmployeeRecords = (arr) => {
    return arr.map(array => createEmployeeRecord(array))
}


let createTimeInEvent = function(dateStamp) {
    let arr = dateStamp.split(' ')
    let time = arr[1]
    let myDate = arr[0]

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: myDate
    })
        
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let arr = dateStamp.split(' ')
    let time = arr[1]
    let myDate = arr[0]

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: myDate
    })
        
    return this
}

let hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(element => element.date === date)
    let timeOut = this.timeOutEvents.find(element => element.date === date)

    return (timeOut.hour - timeIn.hour) / 100 
}

let wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let findEmployeeByFirstName = function(arr, name) {
    return arr.find(obj => obj.firstName === name)
}

let calculatePayroll = function(arr) {
    let payroll = []
    arr.map(function(obj) {
        payroll.push(allWagesFor.call(obj))
    })
    return payroll.reduce((a, b) => a + b)
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
