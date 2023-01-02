import { Account, Appwrite, Storage, Functions } from "@pankod/refine-appwrite";

import { APPWRITE_URL, APPWRITE_PROJECT, TOKEN_KEY, REDIRECT_SUCCESS, REDIRECT_FAILURE } from '~/config';

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
