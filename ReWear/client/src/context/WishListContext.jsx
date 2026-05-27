import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const WishlistContext =
  createContext();

export const WishlistProvider = ({
  children,
}) => {
  const [wishlist, setWishlist] =
    useState([]);

  // GET USER
  const getUser = () =>
    JSON.parse(
      localStorage.getItem("user")
    );

  // LOAD
  useEffect(() => {
    const user = getUser();

    // NO USER = CLEAR
    if (!user) {
      setWishlist([]);

      return;
    }

    const stored =
      JSON.parse(
        localStorage.getItem(
          `wishlist_${user._id}`
        )
      ) || [];

    setWishlist(stored);
  }, []);

  // SAVE
  useEffect(() => {
    const user = getUser();

    // NO USER
    if (!user) return;

    localStorage.setItem(
      `wishlist_${user._id}`,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // TOGGLE
  const toggleWishlist = (
    product
  ) => {
    const user = getUser();

    // BLOCK IF LOGGED OUT
    if (!user) {
      alert(
        "Please login to use wishlist"
      );

      return;
    }

    setWishlist((prev) => {
      const exists = prev.find(
        (p) =>
          (p._id || p.id) ===
          (product._id ||
            product.id)
      );

      // REMOVE
      if (exists) {
        return prev.filter(
          (p) =>
            (p._id || p.id) !==
            (product._id ||
              product.id)
        );
      }

      // ADD
      return [product, ...prev];
    });
  };

  // CLEAR
  const clearWishlist = () => {
    setWishlist([]);

    const user = getUser();

    if (user) {
      localStorage.removeItem(
        `wishlist_${user._id}`
      );
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);