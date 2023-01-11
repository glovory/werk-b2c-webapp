import { Account, Appwrite, Storage, Functions, Databases } from "@pankod/refine-appwrite";

import { APPWRITE_URL, APPWRITE_PROJECT, TOKEN_KEY, REDIRECT_SUCCESS, REDIRECT_FAILURE } from '~/config';

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);

// for file upload
const storage = new Storage(appwriteClient);

//
const functions = new Functions(appwriteClient);
//
const databases = new Databases(appwriteClient);

export {
  appwriteClient,
  account,
  storage,
  functions,
  databases,
  TOKEN_KEY,
  REDIRECT_SUCCESS,
  REDIRECT_FAILURE,
};
