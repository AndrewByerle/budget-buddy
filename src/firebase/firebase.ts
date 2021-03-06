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
    const docRef = doc(
      db,
      "users",
      uid,
      "groups",
      groupId,
      "categories",
      categoryId
    );
    await updateDoc(docRef, {
      ...data,
    });
    return getDoc(docRef);
  };

  const getCategoriesFB = async (categories: Ref<Category[]>) => {
    const uid = await getUid();
    categories.value = [];
    const groupSnapshot = await getDocs(collection(db, "users", uid, "groups"));
    groupSnapshot.forEach(async (doc) => {
      const groupId = doc.data().id;
      const categorySnapshot = await getDocs(
        collection(db, "users", uid, "groups", groupId, "categories")
      );
      categorySnapshot.forEach(async (doc) => {
        let expenseTotal = 0;
        const categoryId = doc.data().id;
        const transactionSnapshot = await getDocs(
          collection(
            db,
            "users",
            uid,
            "groups",
            groupId,
            "categories",
            categoryId,
            "transactions"
          )
        );
        transactionSnapshot.forEach((doc) => {
          expenseTotal += doc.data().amount;
        });
        const updatedCategory = await updateCategoryFB(groupId, categoryId, {
          expense: expenseTotal,
        } as Category);
        categories.value.push(updatedCategory.data() as Category);
      });
    });
  };

  const createTransactionFB = async (
    groupId: string,
    categoryId: string,
    transactionId: string,
    data: Transaction
  ) => {
    const uid = await getUid();
    setDoc(
      doc(
        db,
        "users",
        uid,
        "groups",
        groupId,
        "categories",
        categoryId,
        "transactions",
        transactionId
      ),
      {
        ...data,
      }
    );
  };

  const getTransactionsFB = async (transactions: Ref<Transaction[]>) => {
    const uid = await getUid();
    transactions.value = [];
    const groupSnapshot = await getDocs(collection(db, "users", uid, "groups"));
    groupSnapshot.forEach(async (doc) => {
      const groupId = doc.data().id;
      const categorySnapshot = await getDocs(
        collection(db, "users", uid, "groups", groupId, "categories")
      );
      categorySnapshot.forEach(async (doc) => {
        const transactionSnapshot = await getDocs(
          collection(
            db,
            "users",
            uid,
            "groups",
            groupId,
            "categories",
            doc.data().id,
            "transactions"
          )
        );
        transactionSnapshot.forEach((doc) => {
          transactions.value.push(doc.data() as Transaction);
        });
      });
    });
  };

  return {
    createUserFB,
    createGroupFB,
    updateGroupFB,
    getGroupsFB,
    getTransactionsFB,
    createCategoryFB,
    updateCategoryFB,
    getCategoriesFB,
    getCurrentUser,
    isLoggedIn,
    createTransactionFB,
  };
};

export default useFirebase;
