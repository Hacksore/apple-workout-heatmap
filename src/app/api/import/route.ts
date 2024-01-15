import { db } from "@/lib/db";
import { metrics } from "@/lib/db/schema";
import { NextResponse } from "next/server";

interface Metric {
  data: {
    source: string;
    date: string;
    qty: number;
  };
  name: string;
  units:
  | "min"
  | "count"
  | "in"
  | "count/min"
  | "ms"
  | "%"
  | "kcal"
  | "kcal/hr·kg";
}

interface HealthDataResponse {
  data: {
    metrics: Metric[];
  };
}

export async function POST(req: Request) {
  // TODO: translate the data into a workable shape
  // TODO: add auth to make sure valid calls only work
  // TODO: insert data into db

  const healthPayload: HealthDataResponse = await req.json();
  const healthMetrics = healthPayload.data.metrics;

  db.insert(metrics).values(healthMetrics);

  return NextResponse.json({
    status: "ok",
  });
}
