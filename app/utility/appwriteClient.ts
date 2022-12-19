import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

// process.env.APPWRITE_URL
const APPWRITE_URL = "https://app.microstack.id/v1"; // your-appwrite-url
const APPWRITE_PROJECT = "werk-b2c-staging"; // your-appwrite-project
const TOKEN_KEY = "token_werk_b2c"; // token

// DEV      = http://localhost:3000
// STAGING  = https://staging.werk.id

// For redirect after success
const REDIRECT_SUCCESS = "http://localhost:3000/setup-profile";

// For redirect after failed
const REDIRECT_FAILURE = "http://localhost:3000/auth/failure";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

// for authentication
const account = new Account(appwriteClient);

// for file upload
const storage = new Storage(appwriteClient);

export {
  appwriteClient,
  account,
  storage,
  TOKEN_KEY,
  REDIRECT_SUCCESS,
  REDIRECT_FAILURE,
};
