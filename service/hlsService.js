import Cookies from 'js-cookie';

export const getHlsConfig = () => {
  return {
    xhrSetup: (xhr, url) => {
      const token = Cookies.get('auth_token');
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }
    },
  };
};