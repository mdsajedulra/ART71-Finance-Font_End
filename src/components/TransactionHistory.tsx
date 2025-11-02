import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { History, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import type { ITransaction } from "@/types/trasaction";

export function TransactionHistory({
  transactions,
}: {
  transactions: ITransaction[];
}) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-primary" />
        লেনদেনের ইতিহাস
      </h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">তারিখ</TableHead>
              <TableHead className="font-semibold">ধরন</TableHead>
              <TableHead className="font-semibold">টাকা</TableHead>
              <TableHead className="font-semibold">ক্যাটাগরি</TableHead>
              <TableHead className="font-semibold">পদ্ধতি</TableHead>
              <TableHead className="font-semibold">বিস্তারিত</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  কোনো লেনদেন নেই
                </TableCell>
              </TableRow>
            ) : (
              sortedTransactions.map((transaction: ITransaction) => (
                <TableRow key={transaction._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transaction.type === "income" ? (
                        <>
                          <ArrowUpCircle className="w-4 h-4 text-income" />
                          <span className="text-income font-medium">আয়</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownCircle className="w-4 h-4 text-expense" />
                          <span className="text-expense font-medium">
                            ব্যয়
                          </span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    <span
                      className={
                        transaction.type === "income"
                          ? "text-income"
                          : "text-expense"
                      }
                    >
                      ৳ {transaction.amount.toLocaleString("bn-BD")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {transaction.source}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.paymentMethod === "cash"
                          ? "default"
                          : "secondary"
                      }
                      className="font-medium"
                    >
                      {transaction.paymentMethod === "cash"
                        ? "ক্যাশ"
                        : "ব্যাংক"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {transaction.note || "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
