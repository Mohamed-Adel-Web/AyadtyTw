export interface Role {
  id: number;
  name: string;
  permissions: {
    [section: string]: {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
    };
  };
}
