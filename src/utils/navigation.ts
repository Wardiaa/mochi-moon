// src/utils/navigation.ts
export function navigateTo(path: string) {
  window.location.hash = path;
}

export function useNavigation() {
  return {
    navigate: navigateTo,
    goBack: () => {
      const hash = window.location.hash;
      if (hash.includes('/')) {
        const parts = hash.split('/');
        parts.pop();
        window.location.hash = parts.join('/') || '#/';
      } else {
        window.location.hash = '/';
      }
    }
  };
}