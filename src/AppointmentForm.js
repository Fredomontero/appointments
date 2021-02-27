import React, { useState } from 'react';

const timeIncrements = (numTimes, startTime, increment) => Array(numTimes)
  .fill([startTime])
  .reduce((acc, _, i) => acc.concat([startTime + (i * increment)]));
  
const weeklyDatesValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const toShortDate = timestamp => {
  const [day, month, dayOfMonth, year] = new Date(timestamp).toDateString().split(' ');
  return `${day} ${dayOfMonth}`;
};

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot);
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  );
};

const RadioButtonIfAvailable = ({ availableTimeSlots, date, timeSlot, checkedTimeSlot }) => {
  // console.log("CTS: ", checkedTimeSlot);
  const startsAt = mergeDateAndTime(date, timeSlot);
  // console.log("SA: ", startsAt);
  const isChecked = startsAt === checkedTimeSlot;
  if(availableTimeSlots.some(availableTimeSlot => availableTimeSlot.startsAt === startsAt)){
    return (
      <input
        name="startsAt"
        type="radio"
        value={ startsAt }
        checked={isChecked}
        readOnly
      />
    )
  } return null;
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today, availableTimeSlots, checkedTimeSlot }) => {

  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  const dates = weeklyDatesValues(today);

  return(
    <table id="time-slots">
      <thead>
        <tr>
          <th/>
          { dates.map(day => (<th key={day}>{toShortDate(day)}</th>)) }
        </tr>
      </thead>
      <tbody>
        {
          timeSlots.map(timeSlot => (
            <tr key={timeSlot}>
              <th>{toTimeValue(timeSlot)}</th>
              {
                dates.map(date =>
                  <td key={date}>
                    <RadioButtonIfAvailable
                      availableTimeSlots={availableTimeSlots}
                      date={date}
                      timeSlot={timeSlot}
                      checkedTimeSlot={checkedTimeSlot}
                    />
                  </td>
                )
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5);

export const AppointmentForm = ({ selectableServices, service, onSubmit, salonOpensAt, salonClosesAt, today, availableTimeSlots, checkedTimeSlot }) => { 

  const [ serviceSelected, setServiceSelected ] = useState(service);

  const handleChangeService = ({ target }) => setServiceSelected(target.value);

  return(
    <form id="appointment" onSubmit={ () => onSubmit(serviceSelected)}>
      <label htmlFor="service">Service</label>
      <select 
        name="service"
        id="service"
        value={serviceSelected}
        onChange={handleChangeService}>
          <option/>
          {
            selectableServices.map(service => (
              <option key={service}>{service}</option>
            ))
          };
      </select>
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
        availableTimeSlots={availableTimeSlots}
        checkedTimeSlot={checkedTimeSlot}
      />
    </form>
  )  
};

AppointmentForm.defaultProps = {
  today: new Date(),
  salonOpensAt: 9,
  salonClosesAt: 10,
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  availableTimeSlots: []
};