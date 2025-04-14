import { create } from 'zustand';
import dayjs from 'dayjs';

export const useAuthStore = create(set => ({
  userType: null,
  setUserType: userType => set({ userType }),
  logout: () => set({ userType: null }),
  selectedDate: dayjs().format('YYYY-MM-DD'),
  setSelectedDate: date => set({ selectedDate: date }),
}));
