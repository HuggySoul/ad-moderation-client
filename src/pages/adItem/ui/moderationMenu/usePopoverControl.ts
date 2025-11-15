import { useState } from "react";

type PopoverType = "reject" | "requestChanges";

interface UseModerationPopoversResult {
  isRejectPopoverOpen: boolean;
  isRequestChangesPopoverOpen: boolean;
  handleOpenRejectChange: (open: boolean) => void;
  handleOpenRequestChangesChange: (open: boolean) => void;
  handleCloseAll: () => void;
}

export function usePopoverControl(): UseModerationPopoversResult {
  const [openPopover, setOpenPopover] = useState<PopoverType | null>(null);

  const handleOpenRejectChange = (open: boolean) => {
    setOpenPopover(open ? "reject" : null);
  };

  const handleOpenRequestChangesChange = (open: boolean) => {
    setOpenPopover(open ? "requestChanges" : null);
  };

  const handleCloseAll = () => {
    setOpenPopover(null);
  };

  return {
    isRejectPopoverOpen: openPopover === "reject",
    isRequestChangesPopoverOpen: openPopover === "requestChanges",
    handleOpenRejectChange,
    handleOpenRequestChangesChange,
    handleCloseAll,
  };
}
