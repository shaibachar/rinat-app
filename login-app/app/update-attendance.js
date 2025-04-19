import { Box, Text, VStack, FormControl, Select, CheckIcon, Button } from 'native-base';
import { useEffect, useState } from 'react';
import sessionsData from '../data/sessions.json';
import customersData from '../data/customers.json';

export default function UpdateAttendancePage() {
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  useEffect(() => {
    if (selectedSessionId) {
      const filtered = customersData.filter(customer =>
        customer.signedSessions.includes(selectedSessionId)
      );
      setFilteredCustomers(filtered);
      setSelectedCustomerId('');
    }
  }, [selectedSessionId]);

  const handleSubmit = () => {
    console.log('Selected Session ID:', selectedSessionId);
    console.log('Selected Customer ID:', selectedCustomerId);

    // Optional: Add real attendance update logic here
  };

  return (
    <Box flex={1} bg="gray.50" p="6">
      <VStack space={5}>
        <Text fontSize="xl" fontWeight="bold">עדכון נוכחות</Text>

        <FormControl>
          <FormControl.Label>שיעור</FormControl.Label>
          <Select
            selectedValue={selectedSessionId}
            onValueChange={val => setSelectedSessionId(val)}
            placeholder="Select a class"
            _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={4} /> }}
          >
            {sessionsData.map(session => (
              <Select.Item key={session.id} label={session.title} value={session.id} />
            ))}
          </Select>
        </FormControl>

        <FormControl isDisabled={!selectedSessionId}>
          <FormControl.Label>שם לקוח</FormControl.Label>
          <Select
            selectedValue={selectedCustomerId}
            onValueChange={val => setSelectedCustomerId(val)}
            placeholder="Select a customer"
            _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size={4} /> }}
          >
            {filteredCustomers.map(customer => (
              <Select.Item key={customer.id} label={customer.name} value={customer.id} />
            ))}
          </Select>
        </FormControl>

        <Button onPress={handleSubmit} isDisabled={!selectedSessionId || !selectedCustomerId}>
          here
        </Button>
      </VStack>
    </Box>
  );
}
