export interface ISummary {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
  bankBalance: number;
  cashBalance: number;
}

export interface IIncomeBySource {
  source: string;
  totalIncome: number;
}

export interface IExpenseBySource {
  source: string;
  totalExpense: number;
}

export interface ITransaction {
  _id?: string;
  amount: number;
  type: "income" | "expense";
  paymentMethod: "cash" | "bank";
  source: string;
  description?: string;
  note?: string;
  date: string; // ISO string (e.g. "2025-08-30T10:00:00.000+00:00")
}

interface overAllTransactionSummary {
  remainingBalance: string;
  bankBalance: string;
  cashBalance: string;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
}

export interface ITransactionSummary {
  summary: ISummary;
  overAll: overAllTransactionSummary;
  incomeBySource: IIncomeBySource[];
  expenseBySource: IExpenseBySource[];
  transactions: ITransaction[];
}

export interface ITransactionSummaryResponse {
  success: boolean;
  message: string;
  data: ITransactionSummary;
}
