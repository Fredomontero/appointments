import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';
import ReactTestUtils from 'react-dom/test-utils';

describe(CustomerForm, () => {
  
  let render, container;

  beforeEach(() => {
    ({render, container} = createContainer());
  });

  const form = id => container.querySelector(`form[id="${id}"]`);

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  }

  const field = name => form('customer').elements[name];

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  it('renders a form', () => {
    render(<CustomerForm/>);
    expect(form('customer')).not.toBeNull();
  });

  const itRendersAsATextBox = (fieldName) => {
    it('renders as a text box', () => {
      render(<CustomerForm/>);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      expect(field(fieldName).value).toEqual('value');
    });
  };

  const itRendersALabel = (fieldName, labelText) => {
    it('renders a label', () => {
      render(<CustomerForm/>)
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(labelText);
    });
  };

  const itAssignsAnIDThatMatchesLabelID = (fieldName) => {
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm/>);
      expect(field(fieldName).id).toEqual(fieldName);
    });
  };

  const itSavesExistingValue = (fieldName, value) => {
    it('saves existing value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          { ...{[fieldName]: value} }
          onSubmit={ props => expect(props[fieldName]).toEqual(value) }
        />
      );
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  const itSubmitsNewValue = (fieldName, value) => {
    it('saves new value when submitted', async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName="Ashley"
          { ...{[fieldName]: "Existing Value"} }
          onSubmit={ props => expect(props[fieldName]).toEqual(value) }
        />
      );
      await ReactTestUtils.Simulate.change( field(fieldName), {
        target: { value, name: fieldName }
      });
      await ReactTestUtils.Simulate.submit(form('customer'));
    });
  };

  describe('First name field', () => {

    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIDThatMatchesLabelID('firstName');
    itSavesExistingValue('firstName', 'Ashley');
    itSubmitsNewValue('firstName', 'firstName');

  });

  describe('Last name field', () => {

    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIDThatMatchesLabelID('lastName');
    itSavesExistingValue('lastName', 'Griffin');
    itSubmitsNewValue('lastName', 'lastName');

  });

  describe('Phone number field', () => {

    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber', 'Phone number');
    itAssignsAnIDThatMatchesLabelID('phoneNumber');
    itSavesExistingValue('phoneNumber', '6642945050');
    itSubmitsNewValue('phoneNumber', '6641521031');

  });

  it('has a submit button', () => {
    render(<CustomerForm/>);
    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });

});