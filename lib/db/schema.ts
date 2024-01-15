import {
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const ALL_METRIC_NAMES = [
  "flights_climbed",
  "apple_stand_hour",
  "apple_exercise_time",
  "apple_stand_time",
  "walking_heart_rate_average",
  "step_count",
  "walking_running_distance",
  "resting_heart_rate",
  "heart_rate_variability",
  "walking_asymmetry_percentage",
  "active_energy",
  "blood_oxygen_saturation",
  "time_in_daylight",
  "walking_double_support_percentage",
  "walking_step_length",
  "walking_speed",
  "basal_energy_burned",
  "heart_rate",
  "physical_effort",
] as const;

export const ALL_UNITS = [
  "count",
  "min",
  "mi",
  "count/min",
  "ms",
  "kcal",
  "%",
  "in",
  "mi/hr",
  "kcal/hr·kg",
] as const;

export const metricsTable = mysqlTable("metrics", {
  id: serial("id").primaryKey().notNull(),
  data: json("data"),
  units: mysqlEnum("units", ALL_UNITS),
  metricType: mysqlEnum("metricType", ALL_METRIC_NAMES),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});

