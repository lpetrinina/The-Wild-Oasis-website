import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

export const middleware = auth;


// middleware will run only for these route/s
export const config = {
    matcher: ['/account/:path*']
}