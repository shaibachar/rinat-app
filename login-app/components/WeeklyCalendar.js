import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

const WeeklyCalendar = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Calculate current week's dates (Sunday to Saturday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - startOfWeek.getDay()); // Sunday

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Disable all days except current week
  const getMarkedDates = () => {
    const marked = {};

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (!weekDates.includes(dateStr)) {
        marked[dateStr] = { disabled: true, disableTouchEvent: true };
      }
    }

    // Mark selected date in red
    marked[selectedDate] = {
      selected: true,
      selectedColor: 'red',
    };

    return marked;
  };

  const onDayPress = (day) => {
    if (weekDates.includes(day.dateString)) {
      setSelectedDate(day.dateString);
    }
  };

  return (
    <Calendar
      current={todayStr}
      markedDates={getMarkedDates()}
      onDayPress={onDayPress}
      disableAllTouchEventsForDisabledDays={true}
    />
  );
};

export default WeeklyCalendar;
