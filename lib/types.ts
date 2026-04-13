export interface Airport {
  code: string;
  name: string;
  city: string;
  state: string;
  onTimeRate: number;
  avgDelayMin: number;
  cancelRate: number;
  bestDay: string;
  worstDay: string;
  bestHour: number;
  worstHour: number;
  terminals: string[];
  airlines: string[];
  website: string;
}

export interface Airline {
  slug: string;
  name: string;
  code: string;
  onTimeRate: number;
  avgDelayMin: number;
  cancelRate: number;
  hubs: string[];
}

export type DelayStatus = "on-time" | "moderate" | "severe";

export function getDelayStatus(onTimeRate: number): DelayStatus {
  if (onTimeRate >= 85) return "on-time";
  if (onTimeRate >= 75) return "moderate";
  return "severe";
}

export function getStatusColor(onTimeRate: number): string {
  if (onTimeRate >= 85) return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (onTimeRate >= 75) return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-rose-700 bg-rose-50 border-rose-200";
}

export function getStatusBorderColor(onTimeRate: number): string {
  if (onTimeRate >= 85) return "border-l-emerald-500";
  if (onTimeRate >= 75) return "border-l-amber-500";
  return "border-l-rose-500";
}

export function getOnTimeColor(onTimeRate: number): string {
  if (onTimeRate >= 85) return "text-emerald-600";
  if (onTimeRate >= 75) return "text-amber-600";
  return "text-rose-600";
}
