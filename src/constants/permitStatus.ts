export interface StatusConfig {
  label: string;
  color: string;
  bg: string;
}

export const PERMIT_STATUS_CONFIG: Record<string, StatusConfig> = {
  Issued:    { label: "در انتظار",  color: "#378ADD", bg: "#E6F1FB" },
  Confirmed: { label: "تایید شده",  color: "#1D9E75", bg: "#E1F5EE" },
  Cancelled: { label: "لغو شده",    color: "#E24B4A", bg: "#FCEBEB" },
  Expired:   { label: "منقضی شده",  color: "#BA7517", bg: "#FAEEDA" },
};
