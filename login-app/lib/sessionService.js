import sessionsData from '../data/sessions.json';
import dayjs from 'dayjs';

let sessions = [...sessionsData];

export const getSessions = () => {
  return sessions.filter(session => dayjs(session.date).isAfter(dayjs().subtract(1, 'day')));
};

export const addSession = (session) => {
  const id = `session-${Date.now()}`;
  const newSession = { id, ...session };
  sessions.push(newSession);
  return newSession;
};

export const updateSession = (sessionId, updates) => {
  const index = sessions.findIndex(s => s.id === sessionId);
  if (index !== -1) {
    sessions[index] = { ...sessions[index], ...updates };
    return sessions[index];
  }
  return null;
};

export const deleteSession = (sessionId) => {
  sessions = sessions.filter(s => s.id !== sessionId);
};
