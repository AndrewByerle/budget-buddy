import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import useFirebase from "@/firebase/firebase";
import { removeItem } from "@/utils/remove";
import { computed, ref, watch } from "vue";
import { useGroups } from "./overview";

const { groups } = useGroups();
// const { createTransactionFB, getTransactionsFB, isLoggedIn, updateCategoryFB } =
//   useFirebase();

// const transactions = useLocalStorage<Transaction[]>("trasaction_array", []);
const categorySelected = ref();
const amount = ref();
const description = ref("");
const date = ref();
const isEditTableActive = ref(false);

const tableColumns = ref([
  {
    label: "Date",
    field: "date",
    width: "5%",
    sortable: true,
    isKey: true,
    display: function (row: any) {
      return row.date;
    },
  },
  {
    label: "Description",
    field: "description",
    width: "6%",
    sortable: true,
    isKey: true,
  },
  {
    label: "Category",
    field: "categoryName",
    width: "6%",
    sortable: true,
  },
  {
    label: "Amount",
    field: "amount",
    width: "3%",
    sortable: true,
  },
]);

const allTransactions = computed(() =>
  groups.value.reduce((acc, group) => {
    group.categories.forEach((cat) => {
      acc = [...acc, ...cat.transactions];
    });
    return acc;
  }, [] as Transaction[])
);

const allTransactionsLength = computed(() => allTransactions.value.length);

const table = ref({
  isLoading: false,
  rowClasses: (row: any) => {},
  columns: tableColumns,
  rows: allTransactions,
  totalRecordCount: allTransactionsLength,
  sortable: {
    order: "date",
    sort: "desc",
  },
});

const useTransactions = () => {
  const showDeleteColumn = () => {
    isEditTableActive.value = !isEditTableActive.value;
    if (isEditTableActive.value) {
      tableColumns.value.push({
        label: "Delete",
        field: "delete",
        width: "5%",
        sortable: true,
        isKey: true,
        display: function (row: any) {
          return "<button style='color:white; background-color:red; border-radius: 5px;'>Delete</button>";
        },
      });
    } else {
      tableColumns.value.pop();
    }
  };

  const processTransaction = async (transaction: Transaction) => {
    groups.value.forEach((group) => {
      group.categories.forEach((cat) => {
        if (cat.id === categorySelected.value.id) {
          cat.transactions.unshift(transaction);
        }
      });
    });

    description.value = "";
    amount.value = 0;
  };

  const clearAllTransactions = () => {
    groups.value.forEach((group) =>
      group.categories.forEach((cat) => (cat.transactions = []))
    );
  };

  const rowClicked = (row: Transaction) => {
    if (isEditTableActive.value) {
      groups.value.forEach((group) =>
        group.categories.forEach((cat) => {
          cat.transactions.forEach((transaction) => {
            if (transaction.id === row.id) {
              removeItem(cat.transactions, transaction);
            }
          });
        })
      );
    }
  };

  return {
    processTransaction,
    clearAllTransactions,
    table,
    rowClicked,
    showDeleteColumn,
    categorySelected,
    amount,
    description,
    date,
    isEditTableActive,
    // getTransactions,
  };
};
export default useTransactions;
