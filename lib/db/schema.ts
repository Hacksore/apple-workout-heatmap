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
  "apple_exercise_time",
  "apple_stand_time",
  "apple_stand_hour",
  "resting_heart_rate",
  "walking_heart_rate_average",
  "stair_speed_down",
  "stair_speed_up",
  "heart_rate_variability",
  "step_count",
  "walking_running_distance",
  "blood_oxygen_saturation",
  "time_in_daylight",
  "walking_asymmetry_percentage",
  "active_energy",
  "walking_double_support_percentage",
  "walking_speed",
  "walking_step_length",
  "basal_energy_burned",
  "heart_rate",
  "physical_effort",
] as const;

export const ALL_UNITS = [
  "count",
  "min",
  "mi",
  "count/min",
  "ft/s",
  "ms",
  "kcal",
  "%",
  "in",
  "mi/hr",
  "kcal/hr·kg",
] as const;

export const metricsTable = mysqlTable("metrics", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  data: json("data"),
  units: mysqlEnum("units", ALL_UNITS),
  metricType: mysqlEnum("metricType", ALL_METRIC_NAMES),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});
