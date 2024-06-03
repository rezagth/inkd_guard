/**
 * @type {import("next").NextPage}
 * @returns {NextResponse}
 * @param {NextRequest} req
 * @param {NextResponse} res
 * @param {string} email
 * @param {string} password
 * @param {boolean} isLoading
 * @param {function} setEmail
 * @param {function} setPassword
 * @param {function} setIsLoading
 * @param {function} handleLogin
 * @param {import("react").ReactNode} children
 */

import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const EVENTS_FILE = path.join(process.cwd(), "events.json");

export async function GET() {
  if (!fs.existsSync(EVENTS_FILE)) {
    return NextResponse.json(
      { error: "Events file not found" },
      { status: 404 }
    );
  }
  const data = fs.readFileSync(EVENTS_FILE);
  const events = JSON.parse(data.toString());
  return NextResponse.json(events, { status: 200 });
}

export async function POST(req: NextRequest) {
  const newEvent = await req.json();
  let events = [];
  if (fs.existsSync(EVENTS_FILE)) {
    const data = fs.readFileSync(EVENTS_FILE);
    events = JSON.parse(data.toString());
  }
  events.push(newEvent);
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2));
  return NextResponse.json({ message: "Event added" }, { status: 201 });
}
