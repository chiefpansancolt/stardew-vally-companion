import { Playthrough, TrackedGift } from "@/types/app";

export interface PlaythroughContextType {
  playthroughs: Playthrough[];
  activePlaythrough: Playthrough | null;
  isManualPlaythrough: boolean;
  setActivePlaythrough: (id: string | null) => void;
  addPlaythrough: (
    playthrough: Omit<
      Playthrough,
      "id" | "createdAt" | "lastModified" | "data"
    > &
      Partial<Pick<Playthrough, "data">>,
  ) => void;
  updatePlaythrough: (id: string, updates: Partial<Playthrough>) => void;
  deletePlaythrough: (id: string) => void;
  importData: (jsonString: string) => { success: boolean; error?: string };
  exportData: () => string;
  clearAllData: () => void;
  addTrackedGift: (gift: TrackedGift) => void;
  removeTrackedGift: (itemName: string, villagerName: string) => void;
}

export interface UIContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}
