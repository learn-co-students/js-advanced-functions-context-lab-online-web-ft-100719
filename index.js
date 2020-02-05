const createEmployeeRecord = employee => {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = employees => {
  return employees.map(employee => {
    return createEmployeeRecord(employee);
  });
};

function createTimeInEvent(dateTime) {
  this.timeInEvents.push({
    type: "TimeIn",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  });
  return this;
}

function createTimeOutEvent(dateTime) {
  this.timeOutEvents.push({
    type: "TimeOut",
    date: dateTime.split(" ")[0],
    hour: parseInt(dateTime.split(" ")[1])
  });
  return this;
}

function hoursWorkedOnDate(date) {
  const startTime = this.timeInEvents.find(timeInEvent => {
    return timeInEvent.date === date;
  }).hour;
  const endTime = this.timeOutEvents.find(timeOutEvent => {
    return timeOutEvent.date === date;
  }).hour;
  return (endTime - startTime) / 100;
}

function wagesEarnedOnDate(date) {
  return this.payPerHour * hoursWorkedOnDate.call(this, date);
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
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function(memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

const calculatePayroll = employees => {
  return employees
    .map(employee => {
      return allWagesFor.call(employee);
    })
    .reduce((acc, memo) => {
      return acc + memo;
    });
};

const findEmployeeByFirstName = (employees, firstName) => {
  return employees.find(employee => {
    return employee.firstName === firstName;
  });
};
