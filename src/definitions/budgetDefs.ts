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
};

export type Transaction = {
  description: string;
  category: string;
  date: string;
  amount: number;
};
