import customersData from '../data/customers.json';

let customers = [...customersData];

export const getCustomerById = (id) => {
  return customers.find(c => c.id === id);
};

export const signUpCustomerToSession = (customerId, sessionId) => {
  const customer = customers.find(c => c.id === customerId);
  if (!customer || customer.signedSessions.includes(sessionId)) return;
  customer.signedSessions.push(sessionId);
};

