"use client";

import { useRef, useState } from "react";
import type { ImportStatus } from "@/types";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";

export function useSettingsActions() {
  const { playthroughs, exportData, importData, clearAllData } =
    usePlaythrough();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

  function handleExportData() {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `stardew-companion-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImportData() {
    if (!fileInputRef.current?.files?.length) return;

    const file = fileInputRef.current.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const result = importData(content);

        setImportStatus({
          show: true,
          success: result.success,
          message: result.success
            ? "Data imported successfully!"
            : `Import failed: ${result.error}`,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (result.success) {
          setTimeout(() => setImportStatus(null), 5000);
        }
      } catch (error) {
        setImportStatus({
          show: true,
          success: false,
          message: `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    };

    reader.readAsText(file);
  }

  function handleResetData() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }

    clearAllData();
    setResetSuccess(true);
    setConfirmReset(false);
    setTimeout(() => setResetSuccess(false), 3000);
  }

  return {
    playthroughs,
    fileInputRef,
    confirmReset,
    resetSuccess,
    importStatus,
    setImportStatus,
    handleExportData,
    handleImportData,
    handleResetData,
  };
}
