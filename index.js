/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


function createEmployeeRecord(emp)
{   
    let empObj = Object.assign(
        {firstName: emp[0], 
         familyName:emp[1], 
         title: emp[2], 
         payPerHour: emp[3],
         timeInEvents:  [],
        timeOutEvents: []
    })
    return empObj;

}

function createEmployeeRecords(arr)
{
    let empRecords = arr.map(createEmployeeRecord)
    return empRecords;
}


let createTimeInEvent = function(dateStamp){
    let timeIn = {
        type: "TimeIn", 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    this.timeInEvents.push(timeIn);
    return this
}

let createTimeOutEvent = function(dateStamp){
    let timeOut = {
        type: "TimeOut", 
        hour: parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    }
    this.timeOutEvents.push(timeOut);
    return this
}

let hoursWorkedOnDate = function(dateStamp)
{
    let timeIn = this.timeInEvents.find(e => e.date === dateStamp);
    let timeOut = this.timeOutEvents.find(e => e.date === dateStamp);  
    
    return (timeOut.hour - timeIn.hour)/100;
}

let wagesEarnedOnDate = function(dateStamp)
{
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    return (this.payPerHour * hoursWorked);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName)
{
    let emp = srcArray.find(e => e.firstName === firstName);
    return emp
}

function calculatePayroll(empRecords)
{
    let total = empRecords.reduce (
        (sum, emp) => {
            return sum + allWagesFor.call(emp);
    },0);
    return total;
}