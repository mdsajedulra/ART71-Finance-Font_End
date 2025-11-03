import { Banknote, TrendingUp, Wallet } from "lucide-react";

import TransactionFormModal from "./TransactionFormModal";
import { ChartCom } from "./Chart";
import { useGetAllSummaryWithTransactionsQuery } from "@/redux/features/api/transactionApi";
import type { ITransactionSummaryResponse } from "@/types/trasaction";
import { TransactionHistory } from "./TransactionHistory";
import { DateFilter } from "./DateFilter";
import { useState } from "react";
import type { DateParams } from "@/types/date";

function Summary() {
  const [dateParams, setDateParams] = useState<DateParams | undefined>();
  // console.log(dateParams);

  const { data, isLoading } = useGetAllSummaryWithTransactionsQuery(
    dateParams ?? {}
  ) as {
    data: ITransactionSummaryResponse;
    isLoading: boolean;
  };
  const summary = data?.data.summary;
  // console.log(data?.data);
  // console.log(isLoading);
  if (isLoading) {
    return <p>loading......</p>;
  }
  return (
    <>
      <div>
        <DateFilter setDateParams={setDateParams} />
      </div>
      <div className="border rounded-2xl bg-[#F5F1FA] p-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 items-center">
            <TrendingUp className="w-5 h-5" />
            <div>Summary</div>
          </div>
          <div className="flex gap-5">
            <div className="border rounded-2xl bg-[#F9F8FC] p-10 w-full">
              <h1>৳ {data?.data?.overAll.remainingBalance}</h1>
              <h1>Total Remaining Balance</h1>
            </div>
            <div className="border rounded-2xl bg-[#F9F8FC] p-10 w-full">
              <h1>৳ {summary.totalBalance}</h1>
              <h1>Total Balance By Date</h1>
            </div>
          </div>
          <div className="flex gap-5 mb-5">
            <div className="border w-full rounded-2xl p-10 bg-[#EFFAF3] text-[#1CCE5E]">
              <div className="flex gap-2 items-center">
                <Wallet className="w-4 h-4 text-income" />
                <span>ক্যাশ</span>
              </div>
              <h1 className="font-bold">৳ {data.data.overAll.cashBalance}</h1>
            </div>
            <div className="border w-full rounded-2xl p-10 bg-[#E3DCF2c] text-[#673AB6]">
              <div className="flex gap-2 items-center">
                <Banknote className="w-4 h-4 text-income" />
                <span>ব্যাংক</span>
              </div>
              <h1 className="font-bold">৳ {data.data.overAll.bankBalance}</h1>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex gap-5 mt-5">
          <div className="w-6/12">
            <span>মোট আয়</span>
            <h1>৳ {data.data.overAll.totalIncome}</h1>
            <TransactionFormModal formType="income" buttonText={"Add income"} />
          </div>
          <div className="">
            <span>মোট ব্যায়</span>
            <h1>৳ {data.data.overAll.totalExpense}</h1>
            <div>
              <TransactionFormModal
                formType="expense"
                buttonText={"Add expense"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <ChartCom
          totalIncome={data.data.incomeBySource}
          totalExpense={data.data.expenseBySource}
        />
      </div>
      <div className="mt-10">
        <TransactionHistory transactions={data?.data?.transactions} />
      </div>
    </>
  );
}

export default Summary;
