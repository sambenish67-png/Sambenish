// Storage access can throw when cookies are blocked, in private browsing modes,
// or when the quota is exceeded. These helpers keep the failure visible instead
// of letting it break rendering.

export const readStoredValue = (key: string): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read "${key}" from localStorage:`, error);
    return null;
  }
};

export const writeStoredValue = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Unable to persist "${key}" to localStorage:`, error);
    return false;
  }
};
