// Import the functions you need from the SDKs you need
import type { Category, Group } from "@/definitions/budgetDefs";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  type User,
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

import type { Ref } from "vue";
import { computed } from "@vue/reactivity";
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

const getCurrentUser = async (): Promise<any> => {
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

const isLoggedIn = computed(async () => {
  return (await getCurrentUser()) !== null;
});

const getUid = async (): Promise<string> => {
  const user = await getCurrentUser();
  return user.uid;
};

const db = getFirestore();

const useFirebase = () => {
  const createUserFB = (data: Object, id: string) => {
    setDoc(doc(db, "users", id), {
      ...data,
    });
  };

  const createGroupFB = async (id: string, data: Object) => {
    const uid = await getUid();
    setDoc(doc(db, "users", uid, "groups", id), {
      ...data,
    });
  };

  const updateGroupFB = async (id: string, data: Group) => {
    try {
      const uid = await getUid();
      await updateDoc(doc(db, "users", uid, "groups", id), {
        ...data,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getGroupsFB = async (groups: Ref<Group[]>) => {
    const uid = await getUid();
    const querySnapshot = await getDocs(collection(db, "users", uid, "groups"));
    const temp: Group[] = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data() as Group);
    });
    groups.value = temp;
  };

  const createCategoryFB = async (
    groupId: string,
    categoryId: string,
    data: Object
  ) => {
    const uid = await getUid();
    setDoc(doc(db, "users", uid, "groups", groupId, "categories", categoryId), {
      ...data,
    });
  };

  const updateCategoryFB = async (
    groupId: string,
    categoryId: string,
    data: Category
  ) => {
    const uid = await getUid();
    await updateDoc(
      doc(db, "users", uid, "groups", groupId, "categories", categoryId),
      {
        ...data,
      }
    );
  };

  const getCategoriesFB = async (categories: Ref<Category[]>) => {
    const uid = await getUid();
    categories.value = [];
    const groupSnapshot = await getDocs(collection(db, "users", uid, "groups"));
    groupSnapshot.forEach(async (doc) => {
      console.log("=> doc", doc.data().id);
      const categorySnapshot = await getDocs(
        collection(db, "users", uid, "groups", doc.data().id, "categories")
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
    getCurrentUser,
    isLoggedIn,
  };
};

export default useFirebase;
