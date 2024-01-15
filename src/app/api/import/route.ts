import { NextResponse } from "next/server";

export async function POST() {
  // TODO: translate the data into a workable shape
  // TODO: add auth to make sure valid calls only work
  // TODO: insert data into db

  const data = await req.json();
  console.log(data);

  return NextResponse.json({
    status: "ok",
    data,
  });
}
