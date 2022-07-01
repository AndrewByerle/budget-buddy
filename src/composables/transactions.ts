import useLocalStorage from "@/components/LocalStorage";
import type { Category, Transaction } from "@/definitions/budgetDefs";
import { ref } from "vue";
import { useBudget, useCategories } from "./overview";

const { monthlyAllowance } = useBudget();

const { clearCategories } = useCategories();

// const transactions = ref<Transaction[]>([]);
const transactions = useLocalStorage<Transaction[]>("trasaction_array", []);

const table = ref({
  isLoading: false,
  columns: [
    {
      label: "Date",
      field: "date",
      width: "5%",
      sortable: true,
      isKey: true,
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
  ],
  rows: transactions.value,
  totalRecordCount: transactions.value.length,
  sortable: {
    order: "id",
    sort: "asc",
  },
});

const useTransactions = () => {
  const processTransaction = (transaction: Transaction) => {
    transactions.value.unshift(transaction);
    transaction.category.expense += transaction.amount;
    monthlyAllowance.value -= transaction.amount;
    // refresh table length
    table.value.totalRecordCount = transactions.value.length;
  };

  const clearTransactions = () => {
    clearCategories();
    transactions.value = [];
    table.value.rows = transactions.value;
  };

  const rowClicked = (row: any) => {
    console.log("Row clicked!", row);
  };

  return {
    processTransaction,
    clearTransactions,
    table,
    rowClicked,
  };
};
export default useTransactions;
