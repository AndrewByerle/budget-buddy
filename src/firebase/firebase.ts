// Import the functions you need from the SDKs you need
import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocFromCache,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  getDoc,
  query,
} from "firebase/firestore";

import type { Ref } from "vue";
import { computed, ref } from "@vue/reactivity";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
export const getFirebaseClient = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
  setPersistence(getAuth(), browserSessionPersistence);
};

getFirebaseClient();

const isLoggedIn = computed(async () => {
  return (await getCurrentUser()) !== null;
});

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

const getUid = async () => {
  const user = await getCurrentUser();
  if (user !== null) {
    return user.uid;
  } else {
    return user;
  }
};

const db = getFirestore();

const useFirebase = () => {
  const createUserFB = (data: Object, id: string) => {
    setDoc(doc(db, "users", id), {
      ...data,
    });
  };

  const setGroupsFB = async (data: Object) => {
    const uid = await getUid();
    setDoc(doc(db, "users", uid), {
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

  return {
    createUserFB,
    setGroupsFB,
    updateGroupFB,
    getGroupsFB,
    getCurrentUser,
    isLoggedIn,
  };
};

export default useFirebase;
