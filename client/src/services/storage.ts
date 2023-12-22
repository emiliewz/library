import { User } from '../app/type';

const KEY: string = 'libraryApp';

const saveUser = (u: User): void => {
  localStorage.setItem(KEY, JSON.stringify(u));
};

const getUser = (): User | undefined => {
  const user = localStorage.getItem(KEY);
  if (user) {
    return JSON.parse(user);
  }
};

const getToken = (): string | undefined => {
  const user = getUser();
  return user?.token;
};

const clearUser = (): void => localStorage.removeItem(KEY);

export default {
  saveUser, getUser, clearUser, getToken
};