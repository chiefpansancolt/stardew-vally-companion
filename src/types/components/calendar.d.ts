import type { Season } from "stardew-valley-data";
import type { GameData } from "@/types/app/game";

export interface CalendarProps {
  gameData: GameData;
}

export interface CalendarHeaderProps {
  season: Season;
  onSeasonChange: (season: Season) => void;
}

export interface CalendarBirthday {
  name: string;
  image: string;
}

export interface CalendarFestival {
  name: string;
  calendarIcon: string;
  image: string;
}

export interface CalendarDayCellProps {
  day: number;
  isToday: boolean;
  isBookseller: boolean;
  birthdays: CalendarBirthday[];
  festivals: CalendarFestival[];
  onClick: () => void;
}

export interface CalendarGridProps {
  season: Season;
  currentDay: number | null;
  birthdays: Map<number, CalendarBirthday[]>;
  festivals: Map<number, CalendarFestival[]>;
  booksellerDays: Set<number>;
  onDayClick: (day: number) => void;
}

export interface CalendarDayModalProps {
  day: number | null;
  season: Season;
  isBookseller: boolean;
  birthdays: CalendarBirthday[];
  festivals: CalendarFestival[];
  onClose: () => void;
}
