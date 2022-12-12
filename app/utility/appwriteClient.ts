import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://app.microstack.id/v1"; // your-appwrite-url
const APPWRITE_PROJECT = "werk-b2c"; // your-appwrite-project
const TOKEN_KEY = "token-werk-b2c"; // token

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);
const account = new Account(appwriteClient);
const storage = new Storage(appwriteClient);

export { appwriteClient, account, storage, TOKEN_KEY };
