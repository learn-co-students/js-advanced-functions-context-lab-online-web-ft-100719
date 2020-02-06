/* Your Code Here */
function createEmployeeRecord(array){
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
   
       }
       return employeeRecord

}

function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp ){
    //dateStamp format (YYY-MM-DD HHMM) split at space
    let [date, hour] = dateStamp.split(" ")
    let timeEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeInEvents.push(timeEvent)
    return this
}

function createTimeOutEvent(dateStamp ){
    
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    
    return this
}

function hoursWorkedOnDate(date){
    const timeIn = this.timeInEvents.find(timeInEvent => {return timeInEvent.date === date;
    }).hour;
    const timeOut = this.timeOutEvents.find(timeOutEvent => {return timeOutEvent.date === date;
    }).hour;

    let hoursWorked = (timeOut - timeIn)/ 100;
    return hoursWorked
}

function wagesEarnedOnDate(date){
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

function calculatePayroll(empRecordsArr){
    return empRecordsArr.reduce(function(total, record){
        return total + allWagesFor.call(record)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(name => { return name.firstName === firstName});
}