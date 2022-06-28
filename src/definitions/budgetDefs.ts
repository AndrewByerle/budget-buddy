export type Group = {
  name: string;
  edit: boolean;
  collapsed: boolean;
  id: string;
};

export type Category = {
  name: string;
  assigned: number;
  spent: number;
  available: number;
  groupId: string;
};
