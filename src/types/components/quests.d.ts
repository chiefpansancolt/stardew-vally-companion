export interface QuestsEditDraft {
  questsCompleted: Record<string, boolean>;
  specialOrdersCompleted: Record<string, boolean>;
  secretNotes: Record<string, boolean>;
  lostBooks: Record<string, boolean>;
  helpWantedCompleted: number;
  lostBooksFound: number;
}

export interface QuestsEditStepProps {
  questsCompleted: Record<string, boolean>;
  helpWantedCompleted: number;
  onQuestsChange: (questsCompleted: Record<string, boolean>) => void;
  onHelpWantedChange: (helpWantedCompleted: number) => void;
}

export interface SpecialOrdersEditStepProps {
  specialOrdersCompleted: Record<string, boolean>;
  onChange: (specialOrdersCompleted: Record<string, boolean>) => void;
}

export interface NotesBooksEditStepProps {
  secretNotes: Record<string, boolean>;
  lostBooks: Record<string, boolean>;
  lostBooksFound: number;
  onNotesChange: (secretNotes: Record<string, boolean>) => void;
  onBooksChange: (lostBooks: Record<string, boolean>) => void;
  onLostBooksFoundChange: (lostBooksFound: number) => void;
}
