import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    const access = req.headers.get("Authorization");
    const API_URL = process.env.API_URL + "/todos/"; // Use hidden API URL
    const response = await axios.get(API_URL, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}

export async function POST(req: NextRequest) {
    const access = req.headers.get("Authorization");
    const API_URL = process.env.API_URL + "/todos/"; // Use hidden API URL
    const data = await req.json();
    const response = await axios.post(API_URL, data, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}
