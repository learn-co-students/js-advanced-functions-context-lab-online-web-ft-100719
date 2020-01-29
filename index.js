/* Your Code Here */
const createEmployeeRecord = (employeeArray) => {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeeArray) => {
    return employeeArray.map(n => createEmployeeRecord(n))
}

const createTimeInEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')
   this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return this
} 

const createTimeOutEvent = function(timeStamp){
    let [date, hour] = timeStamp.split(' ')
   this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
} 

const hoursWorkedOnDate = function(date){
    const timeIn = this.timeInEvents.find(n => n.date === date)
    const timeOut = this.timeOutEvents.find(n => n.date === date)
    return (timeOut.hour - timeIn.hour)/100
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

const findEmployeeByFirstName = function(employeeArray, firstName){
    return employeeArray.find(n => n.firstName === firstName)
}


const calculatePayroll = function(employeeArray, firstName){
    return employeeArray.reduce((memo, employee) => memo + allWagesFor.call(employee),0 )
}
