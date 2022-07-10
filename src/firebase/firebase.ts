// Import the functions you need from the SDKs you need
import type { Category, Group } from "@/definitions/budgetDefs";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  query,
} from "firebase/firestore";

import { onUnmounted, ref, type Ref } from "vue";
export const getFirebaseClient = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  setPersistence(getAuth(), browserLocalPersistence);
};

getFirebaseClient();
const uid = ref();

const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener(), resolve(user);
      },
      reject
    );
  });
};
await getCurrentUser().then((user: any) => (uid.value = user.uid));

const db = getFirestore();

const useFirebase = () => {
  // Add a new document in collection "cities"
  const createUserFB = (data: Object) => {
    console.log("creaeuser", uid.value);
    setDoc(doc(db, "users", uid.value), {
      ...data,
    });
  };

  const createGroupFB = (id: string, data: Object) => {
    return setDoc(doc(db, "users", uid.value, "groups", id), {
      ...data,
    });
  };

  const updateGroupFB = async (id: string, data: Group) => {
    try {
      await updateDoc(doc(db, "users", uid.value, "groups", id), {
        ...data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getGroupsFB = async (groups: Ref<Group[]>) => {
    const querySnapshot = await getDocs(
      collection(db, "users", uid.value, "groups")
    );
    const temp: Group[] = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data() as Group);
    });
    groups.value = temp;
  };

  const createCategoryFB = (
    groupId: string,
    categoryId: string,
    data: Object
  ) => {
    return setDoc(
      doc(db, "users", uid.value, "groups", groupId, "categories", categoryId),
      {
        ...data,
      }
    );
  };

  const updateCategoryFB = async (
    groupId: string,
    categoryId: string,
    data: Category
  ) => {
    await updateDoc(
      doc(db, "users", uid.value, "groups", groupId, "categories", categoryId),
      {
        ...data,
      }
    );
  };

  const getCategoriesFB = async (categories: Ref<Category[]>) => {
    categories.value = [];
    const groupSnapshot = await getDocs(
      collection(db, "users", uid.value, "groups")
    );
    groupSnapshot.forEach(async (doc) => {
      console.log("=> doc", doc.data().id);
      const categorySnapshot = await getDocs(
        collection(
          db,
          "users",
          uid.value,
          "groups",
          doc.data().id,
          "categories"
        )
      );
      categorySnapshot.forEach((doc) => {
        console.log(doc.data());
        categories.value.push(doc.data() as Category);
      });
    });
  };

  return {
    createUserFB,
    createGroupFB,
    updateGroupFB,
    getGroupsFB,
    createCategoryFB,
    updateCategoryFB,
    getCategoriesFB,
  };
};

export default useFirebase;
