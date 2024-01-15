import { NextResponse } from "next/server";

export async function POST() {
  // TODO: translate the data into a workable shape
  // TODO: insert data into db
  
  return NextResponse.json({
    status: "ok",
  });
}
