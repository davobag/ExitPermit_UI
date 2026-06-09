export interface VehicleType {
  id: number;
  label: string;
  bg: string;
  color: string;
  dot: string;
}

export const VEHICLE_TYPES: Record<number, VehicleType> = {
  1: { id: 1, label: "سواری",  bg: "#E6F1FB", color: "#0C447C", dot: "#378ADD" },
  2: { id: 2, label: "وانت",   bg: "#EAF3DE", color: "#27500A", dot: "#639922" },
  3: { id: 3, label: "کامیون", bg: "#FAEEDA", color: "#633806", dot: "#BA7517" },
  4: { id: 4, label: "تریلی",  bg: "#FAECE7", color: "#712B13", dot: "#D85A30" },
};
