import { create } from 'zustand';
import dayjs from 'dayjs';

export const useAuthStore = create(set => ({
  userType: null,
  currentUser: null,
  selectedDate: dayjs().format('YYYY-MM-DD'),

  setUserType: userType => set({ userType }),
  setCurrentUser: user => set({ currentUser: user }),
  setSelectedDate: date => set({ selectedDate: date }),
  logout: () => set({ userType: null, currentUser: null })
}));
