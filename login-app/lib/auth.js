import customers from '../data/customers.json';
import managers from '../data/managers.json';

export const loginUser = async (id, password) => {
  const manager = managers.find(u => u.id === id && u.password === password);
  if (manager) return { userType: 'manager', user: manager };

  const customer = customers.find(u => u.id === id && u.password === password);
  if (customer) return { userType: 'customer', user: customer };

  throw new Error('Invalid credentials');
};
