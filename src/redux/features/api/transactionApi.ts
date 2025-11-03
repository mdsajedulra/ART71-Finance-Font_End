import { baseApi } from "@/redux/api/baseApi";

interface TransactionQueryParams {
  startDate?: string;
  endDate?: string;
  range?: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSummaryWithTransactions: builder.query<
      unknown,
      TransactionQueryParams
    >({
      query: ({ startDate, endDate, range } = {} as TransactionQueryParams) => {
        const params = new URLSearchParams();

        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (range) params.append("range", range);
        console.log("form params:", params.toString());

        return {
          url: `/transaction/all_transaction_by_source?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation({
      query: (transactionData) => ({
        url: "/transaction",
        method: "POST",
        body: transactionData,
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
  overrideExisting: false,
});

// add income expense transaction hooks

export const {
  useGetAllSummaryWithTransactionsQuery,
  useAddTransactionMutation,
} = transactionApi;
