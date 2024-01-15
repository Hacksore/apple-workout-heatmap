import {
  json,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const metrics = mysqlTable("metrics", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  data: json("data"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});
