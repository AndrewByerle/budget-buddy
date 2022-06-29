import type { Category, Transaction } from "@/definitions/budgetDefs";
import { ref } from "vue";

const transactions = ref<Transaction[]>([]);

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
      field: "category",
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
  const processTransaction = (transaction: Transaction, category: Category) => {
    transactions.value.unshift(transaction);
    category.expense += transaction.amount;
  };

  return { processTransaction, transactions, table };
};
export default useTransactions;
