import { getCurrentUser, getBlogsById, getItemsById } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setIsLoggedIn(true);
        setCurrentUser(currentUser);
        await fetchCurrentUserData(currentUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUserData = async (currentUser) => {
    try {
      setIsLoading(true);
      const [userBlogs, userItems] = await Promise.all([
        getBlogsById(currentUser.$id),
        getItemsById(currentUser.$id),
      ]);

      setBlogs(userBlogs);
      setItems(userItems);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const refetchCurrentUserData = () => fetchCurrentUserData();

  // const memoizedBlogs = useMemo(() => blogs, [blogs]);
  // const memoizedItems = useMemo(() => items, [items]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        blogs,
        items,
        setCurrentUser,
        isLoading,
        refetchCurrentUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
