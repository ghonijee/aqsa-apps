export interface AccountMutationTable {
  id?: number;
  accountId: number;
  transactionId?: number;
  debit?: number | null;
  credit?: number | null;
  balance: number;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewAccountMutation = Omit<
  AccountMutationTable,
  "id" | "createdAt" | "updatedAt"
>;
