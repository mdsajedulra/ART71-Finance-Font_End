import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { TransactionForm } from "./TransactionForm";
import type { TFormType } from "@/types/formType";

function TransactionFormModal({
  buttonText,
  formType,
}: {
  buttonText: string;
  formType: TFormType;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>{buttonText}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <TransactionForm formType={formType} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TransactionFormModal;
