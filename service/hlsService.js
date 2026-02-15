import Cookies from 'js-cookie';

export const getHlsConfig = () => {
  return {
    xhrSetup: (xhr, url) => {
      // Get the token right at the moment the request is being made
      const token = Cookies.get('auth_token');
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }
    },
  };
};