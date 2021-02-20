const today = new Date();
const at = hours => today.setHours(hours, 0);
export const sampleAppointments = [
  { startsAt: at(9), customer: { firstName: 'Charlie', lastname: 'Ferdinand' } },
  { startsAt: at(10), customer: { firstName: 'Frankie', lastname: 'Suarez' } },
  { startsAt: at(11), customer: { firstName: 'Casey', lastname: 'Logan' } },
  { startsAt: at(12), customer: { firstName: 'Ashley', lastname: 'Ramirez' } },
  { startsAt: at(13), customer: { firstName: 'Jordan', lastname: 'Jefferson' } },
  { startsAt: at(14), customer: { firstName: 'Jay', lastname: 'Ibarra' } },
  { startsAt: at(15), customer: { firstName: 'Alex', lastname: 'Cruise' } },
  { startsAt: at(16), customer: { firstName: 'Jules', lastname: 'Patterson' } },
  { startsAt: at(17), customer: { firstName: 'Stevie', lastname: 'Geremy' } }
];