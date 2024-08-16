import { Account, Client, Databases, ID, Query } from "react-native-appwrite";
import { config } from "./appwriteConfig";

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

// @Authentication Controllers

export const signIn = async ({ email, password }) => {
  // could add OAuth
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    // console.log(error)
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
};

// @User Controllers

export const createUser = async ({
  username,
  email,
  password,
  phoneNumber,
}) => {
  try {
    // @Auth
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    await signIn({
      email: email,
      password: password,
    });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        id: newAccount.$id,
        email: email,
        username: username,
        phoneNumber: phoneNumber,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    // console.log(error); -> [Error: Error: AppwriteException: User (role: guests) missing scope (account)]
    return null;
  }
};
