import { db } from "@/lib/db";
import { metricsTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { HealthDataResponse } from "../../types";

export async function POST(req: Request) {
  // TODO: add auth to make sure valid calls only work

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
