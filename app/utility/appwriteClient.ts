import { Account, Appwrite, Storage, Functions } from "@pankod/refine-appwrite";

import { APPWRITE_URL, APPWRITE_PROJECT, TOKEN_KEY, REDIRECT_SUCCESS, REDIRECT_FAILURE } from '~/config';

// process.env.APPWRITE_URL
// const APPWRITE_URL = "https://app.microstack.id/v1"; // your-appwrite-url
// const APPWRITE_PROJECT = "werk-b2c-staging"; // your-appwrite-project
// const TOKEN_KEY = "token_werk_b2c"; // token

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);

// for file upload
const storage = new Storage(appwriteClient);

//
const functions = new Functions(appwriteClient);

export {
  appwriteClient,
  account,
  storage,
  functions,
  TOKEN_KEY,
  REDIRECT_SUCCESS,
  REDIRECT_FAILURE,
};
