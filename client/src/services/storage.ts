import { User } from '../app/type';

const KEY: string = 'libraryApp';

const saveUser = (u: User): void => {
  localStorage.setItem(KEY, JSON.stringify(u));
};

const getUser = (): User | null => {
  const user = localStorage.getItem(KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const getToken = (): string | undefined => {
  const user = getUser();
  return user?.token;
};

const clearUser = (): void => localStorage.removeItem(KEY);

export default {
  saveUser, getUser, clearUser, getToken
};