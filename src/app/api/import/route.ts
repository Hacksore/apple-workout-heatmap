import { db } from "@/lib/db";
import { metricsTable, ALL_UNITS, ALL_METRIC_NAMES } from "@/lib/db/schema";
import { NextResponse } from "next/server";

interface Metric {
  data: {
    source: string;
    date: string;
    qty: number;
  };
  name: typeof ALL_METRIC_NAMES;
  units: typeof ALL_UNITS;
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

  for (const metric of healthMetrics) {

    await db.insert(metricsTable).values({
      // @ts-ignore
      metricType: metric.name,
      units: metric.units,
      data: metric.data,
    });
  }

  return NextResponse.json({
    status: "ok",
  });
}
