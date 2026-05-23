"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type VoteConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  onConfirm: () => void;
};

export function VoteConfirmDialog({
  open,
  onOpenChange,
  candidateName,
  onConfirm,
}: VoteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm your vote</DialogTitle>
          <p className="text-sm text-white/60">
            You are about to cast a single immutable vote for {candidateName}. This action cannot be undone.
          </p>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm and Encrypt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
