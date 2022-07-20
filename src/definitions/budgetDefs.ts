export type Group = {
  name: string;
  edit: boolean;
  collapsed: boolean;
  id: string;
  categories: Category[];
};

export type Category = {
  name: string;
  expense: number;
  id: string;
  transactions: Transaction[];
};

export type Transaction = {
  description: string;
  date: string;
  amount: number;
  id: string;
  categoryName: string;
};
