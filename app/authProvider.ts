import type { AuthProvider } from "@pankod/refine-core";
import Cookies from "js-cookie";
import * as cookie from "cookie";
// import store from "store2"; // OPTION: Custom for delete localStorage

import { account, appwriteClient, TOKEN_KEY } from "~/utility";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const user = await account.createEmailSession(email, password);
      Cookies.set(TOKEN_KEY, user.providerAccessToken);
      return Promise.resolve(user);
    } catch (e) {
      return Promise.reject();
    }
  },
  logout: async (redirectPath = "/") => {
    // Cookies.remove(TOKEN_KEY);
    // await account.deleteSession("current");
    // return Promise.resolve(redirectPath);

    try {
      Cookies.remove(TOKEN_KEY);
      await account.deleteSession("current");
      // store.remove("cookieFallback"); // OPTION: Custom for delete localStorage
      return Promise.resolve(redirectPath);
    } catch(e) {
      return Promise.reject(e);
    }
  },
  checkError: () => Promise.resolve(),
  // checkError: (err) => {
  //   if(err?.response?.status === 401){
  //     return Promise.reject("/register");
  //   }
  //   return Promise.resolve();
  // },
  checkAuth: async (context) => {
    let token = undefined;
    if (context) {
      const { request } = context;
      const parsedCookie = cookie.parse(request.headers.get("Cookie"));
      token = parsedCookie[TOKEN_KEY];
    } else {
      const parsedCookie = Cookies.get(TOKEN_KEY);
      token = parsedCookie;
    }

    if (!token) {
      return Promise.reject();
    }
    appwriteClient.setJWT(token);
    const session = await account.get();

    if (session) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const user = await account.get();
    if (user) {
      return user;
    }
  },
};
