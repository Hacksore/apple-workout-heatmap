import { ALL_METRIC_NAMES, ALL_UNITS } from "@/lib/db/schema";

export interface Metric {
  data: {
    source: string;
    date: string;
    qty: number;
  };
  name: typeof ALL_METRIC_NAMES;
  units: typeof ALL_UNITS;
}

export interface HealthDataResponse {
  data: {
    metrics: Metric[];
  };
}
