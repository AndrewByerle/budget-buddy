import type { Category, Group, Transaction } from "@/definitions/budgetDefs";
import { removeItem } from "@/utils/remove";
import { ref } from "vue";
import { useMonthlyAllowance } from "./allowance";
import { useCategories, useGroups } from "./overview";

const { monthlyAllowance } = useMonthlyAllowance();
const { clearCategories, increaseCategoryExpense } = useCategories();
const { deleteGroup } = useGroups();

const transactions = ref<Transaction[]>([]);
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

const table = ref({
  isLoading: false,
  rowClasses: (row: any) => {},
  columns: tableColumns,
  rows: transactions.value,
  totalRecordCount: transactions.value.length,
  sortable: {
    order: "date",
    sort: "desc",
  },
});

const useTransactions = () => {
  const editTransactions = () => {
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

  const processTransaction = (transaction: Transaction) => {
    transactions.value.unshift(transaction);
    increaseCategoryExpense(transaction.categoryId, transaction.amount);
    monthlyAllowance.value -= transaction.amount;
    table.value.totalRecordCount = transactions.value.length;
    description.value = "";
    amount.value = 0;
  };

  const clearAllTransactions = () => {
    clearCategories();
    transactions.value = [];
    table.value.rows = transactions.value;
  };

  const deleteGroupTransactions = (group: Group) => {
    const removeCateogires = deleteGroup(group);
    const removeTransactions = ref<Transaction[]>([]);
    removeCateogires.forEach((category) =>
      transactions.value.forEach((transaction) => {
        if (category.id === transaction.categoryId) {
          removeTransactions.value.push(transaction);
        }
      })
    );
    removeTransactions.value.forEach((element) =>
      removeItem(transactions.value, element)
    );
  };

  const rowClicked = (row: any) => {
    if (isEditTableActive.value) {
      increaseCategoryExpense(row.categoryId, -row.amount);
      monthlyAllowance.value += row.amount;
      removeItem(transactions.value, row);
    }
  };

  return {
    processTransaction,
    clearAllTransactions,
    deleteGroupTransactions,
    table,
    rowClicked,
    editTransactions,
    categorySelected,
    amount,
    description,
    date,
    transactions,
  };
};
export default useTransactions;
