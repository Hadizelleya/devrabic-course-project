import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, database } from "./fireBaseConfig";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const registerUser = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(database, "users", user.uid), {
      username: username,
      cartsProducts: [],
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchUser = async (user) => {
  try {
    const q = query(
      collection(database, "users"),
      where("__name__", "==", user?.uid)
    );
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateArrayData = async (product) => {
  const user = auth.currentUser;
  const docRef = doc(database, "users", user.uid);
  try {
    await updateDoc(docRef, {
      cartsProducts: arrayUnion(product),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const removeArrayData = async (product) => {
  const user = auth.currentUser;
  const docRef = doc(database, "users", user.uid);
  try {
    await updateDoc(docRef, {
      cartsProducts: arrayRemove(product),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const setupListener = (user, callback) => {
  const docRef = doc(database, "users", user.uid);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data["cartsProducts"]);
    }
  });
};
