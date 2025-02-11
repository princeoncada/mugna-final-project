import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { refresh } = await req.json(); // Get credentials from request body
    const API_URL = process.env.API_URL + "/token/refresh/"; // Use hidden API URL
    const response = await axios.post(API_URL, { refresh });
    return NextResponse.json(response.data); // Send API response to frontend
}
