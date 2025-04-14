export const loginUser = async (id, password) => {
    if (id === 'manager' && password === '1234') {
      return { userType: 'manager' };
    } else if (id === 'customer' && password === 'abcd') {
      return { userType: 'customer' };
    } else {
      throw new Error('Invalid credentials');
    }
  };
  