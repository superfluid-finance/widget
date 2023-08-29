import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["https://fonts.googleapis.com"];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (allowedOrigins.find((origin) => request.nextUrl.href.includes(origin))) {
    response.headers.append("Access-Control-Allow-Origin", "*");
  }

  return response;
}
