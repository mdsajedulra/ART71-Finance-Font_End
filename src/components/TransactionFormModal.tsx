import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TransactionForm } from "./TransactionForm";
import type { TFormType } from "@/types/formType";
import { useState } from "react";

function TransactionFormModal({
  buttonText,
  formType,
}: {
  buttonText: string;
  formType: TFormType;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} >
        <DialogTrigger asChild>
          <Button onClick={()=> setOpen(true)}>{buttonText}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <TransactionForm formType={formType} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TransactionFormModal;
