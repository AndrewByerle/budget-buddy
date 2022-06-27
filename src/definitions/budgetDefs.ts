export type Group = {
  name: string;
  edit: boolean;
  collapsed: boolean;
};

export type Category = {
  name: string;
  assigned: number;
  spent: number;
  available: number;
};
