// Import the functions you need from the SDKs you need
import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  collection,
  CollectionReference,
  getFirestore,
} from "firebase/firestore";
import { doc, setDoc, updateDoc, onSnapshot, query } from "firebase/firestore";

import type { Ref } from "vue";
import { computed, ref } from "@vue/reactivity";
export const getFirebaseClient = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };

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

const monthsCollection = async () => {
  return collection(db, "users", await getUid(), "months");
};

const useFirebase = () => {
  const createUserFB = (data: Object, id: string) => {
    const date = new Date();
    const monthDate = `${date.getMonth() + 1}-${date.getFullYear()}`;
    setDoc(doc(db, "users", id), {
      ...data,
    });
    setDoc(doc(db, "users", id, "months", monthDate), {
      monthlyAllowance: 0,
      groups: [],
    });
  };

  const updateGroupsFB = async (groups: Group[], monthDate: string) => {
    try {
      await updateDoc(doc(await monthsCollection(), monthDate), {
        groups: groups,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const updateMonthlyAllowance = async (
    monthlyAllowance: number,
    monthDate: string
  ) => {
    try {
      await updateDoc(doc(await monthsCollection(), monthDate), {
        monthlyAllowance: monthlyAllowance,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getDataFB = async (
    groups: Ref<Group[]>,
    monthlyAllowance: Ref<number>,
    monthDate: string
  ) => {
    const docRef = doc(await monthsCollection(), monthDate);
    onSnapshot(doc(await monthsCollection(), monthDate), (doc) => {
      if (doc.exists()) {
        groups.value = doc.data()?.groups;
        monthlyAllowance.value = doc.data()?.monthlyAllowance;
      } else {
        setDoc(docRef, {
          monthlyAllowance: monthlyAllowance.value,
          groups: [],
        });
      }
    });
  };

  return {
    createUserFB,
    updateGroupsFB,
    updateMonthlyAllowance,
    getDataFB,
    getCurrentUser,
    isLoggedIn,
  };
};

export default useFirebase;
