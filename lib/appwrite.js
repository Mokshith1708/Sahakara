import { Account, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
import { config } from "./appwriteConfig";

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

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

// Get user by id

export const getUserById = async (id) => {
  try {
    const user = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("id", id)]
    );

    if (!user) throw Error;

    return user.documents[0];
  } catch (error) {
    return null;
  }
};

// @Blogs

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const blogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId
    );

    return blogs.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Get blogs by id

export const getBlogsById = async (id) => {
  try {
    const blogs = await databases.listDocuments(
      config.databaseId,
      config.blogCollectionId,
      [Query.equal("authorId", id)] // should use user document id
    );

    if (!blogs) throw Error;

    return blogs.documents;
  } catch (error) {
    return null;
  }
};

// @Items

// Get all items
export const getAllItems = async () => {
  try {
    const items = await databases.listDocuments(
      config.databaseId,
      config.itemCollectionId
    );

    return items.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// Get items by id

export const getItemsById = async (id) => {
  try {
    const items = await databases.listDocuments(
      config.databaseId,
      config.itemCollectionId,
      [Query.equal("userId", id)]
    );

    if (!items) throw Error;

    return items.documents;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// Add a blog

export const uploadFile = async (file) => {
  if(!file) return;
  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileURI = await getFilePreview(uploadedFile.$id);
    return fileURI;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId) => {
  let fileURI;

  try {
    fileURI = storage.getFilePreview(
      config.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    if(!fileURI) throw Error;
    return fileURI;
  } catch (error) {
    throw new Error(error);
  }
}

export const createBlog = async ({
  authorId,
  content,
  photo,
}) => {
  try {
    const _blogURI = await uploadFile(photo);

    const newBlog = await databases.createDocument(
      config.databaseId,
      config.blogCollectionId,
      ID.unique(),
      {
        authorId: authorId,
        content: content,
        blogURI: _blogURI,
        likes: 0,
        thumbsUp: 0,
      }
    );
    return newBlog;
  } catch (error) {
    throw new Error(error);
  }
};
