import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'github_token';

export const saveToken = async (token: string): Promise<void> => {
  await Preferences.set({
    key: TOKEN_KEY,
    value: token,
  });
};

export const getToken = async (): Promise<string | null> => {
  const { value } = await Preferences.get({ key: TOKEN_KEY });
  return value;
};

export const removeToken = async (): Promise<void> => {
  await Preferences.remove({ key: TOKEN_KEY });
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  return token !== null;
};
