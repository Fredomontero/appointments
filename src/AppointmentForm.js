import React, { useState } from 'react';

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => { 

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
    </form>
  )  
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
};