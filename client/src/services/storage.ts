import { User } from '../app/type';

const KEY: string = 'libraryApp';

const saveUser = (u: User): void => {
  localStorage.setItem(KEY, JSON.stringify(u));
};

const clearUser = (): void => localStorage.removeItem(KEY);

export default {
  saveUser, clearUser
};