import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const USERS_FILE = path.join(process.cwd(), "users.json");

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!fs.existsSync(USERS_FILE)) {
    return NextResponse.json(
      { error: "Users file not found" },
      { status: 404 }
    );
  }
  const data = fs.readFileSync(USERS_FILE);
  const users = JSON.parse(data.toString());
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return NextResponse.json(
      { message: "Authentication successful" },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
