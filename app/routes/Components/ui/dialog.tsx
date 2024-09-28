import * as React from "react";
import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogDescription as RadixDialogDescription,
  DialogClose as RadixDialogClose,
} from "@radix-ui/react-dialog";
import { Button } from "./button";

// Custom DialogHeader (since Radix doesn't provide this)
function DialogHeader({ children }: { children: React.ReactNode }) {
  return (
    <header style={{ marginBottom: '1rem' }}>
      {children}
    </header>
  );
}

// Custom DialogFooter (since Radix doesn't provide this)
function DialogFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer style={{ marginTop: '1rem' }}>
      {children}
    </footer>
  );
}

// Dialog component
interface DialogProps {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, title, description, children }) => {
  return (
    <RadixDialog open={open} onOpenChange={onOpenChange}>
      <RadixDialogContent>
        <DialogHeader>
          <RadixDialogTitle>{title}</RadixDialogTitle>
          {description && <RadixDialogDescription>{description}</RadixDialogDescription>}
        </DialogHeader>
        <div className="py-4">
          {children}
        </div>
        <DialogFooter>
          <RadixDialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </RadixDialogClose>
        </DialogFooter>
      </RadixDialogContent>
    </RadixDialog>
  );
};

// Only export components provided by Radix
export const DialogContent = RadixDialogContent;
export const DialogTitle = RadixDialogTitle;
export const DialogDescription = RadixDialogDescription;
export const DialogClose = RadixDialogClose;
