import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const instance = axios.create({
  baseURL: process.env.BACKEND_URL
    ? `${process.env.BACKEND_URL}/admin`
    : 'https://testerp.co/tenant/api',
});


instance.interceptors.request.use(
  (config) => {
    const authToken = "1063|CRr2W8rNY58v98WceTlvCqDp1kgPxhsxeF8wJLUY";
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    config.headers['Accept'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response.status;

    if (status === 401) {
      // useAuthStore().clearAuthToken();
      // //todo: redirect to / page via router
      // location.reload();
    }
    return Promise.reject(error);
  }
);
export default boot(({ app }) => {
  app.config.globalProperties.$http = axios;
});

export { instance };
