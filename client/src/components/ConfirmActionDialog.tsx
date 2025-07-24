import { ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"

interface ConfirmActionDialogProps {
    children: ReactNode;
    alertDialog: string;
    actionOnConfirm: () => void;
}   

export const ConfirmActionDialog = ({children, alertDialog, actionOnConfirm}: ConfirmActionDialogProps) => {
  return (
     <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDialog}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-500 hover:bg-red-500 text-white">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-accent_purple hover:bg-accent_purple/80" onClick={actionOnConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
