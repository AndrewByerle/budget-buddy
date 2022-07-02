export type Group = {
  name: string;
  edit: boolean;
  collapsed: boolean;
  id: string;
};

export type Category = {
  name: string;
  expense: number;
  groupId: string;
  id: string;
};

export type Transaction = {
  description: string;
  categoryName: string;
  date: string;
  amount: number;
  categoryId: string;
  id: string;
};
