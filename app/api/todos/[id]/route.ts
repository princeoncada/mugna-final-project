import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const access = req.headers.get("Authorization");
    const id = (await params).id;
    const API_URL = process.env.API_URL + "/todos/" + id; // Use hidden API URL
    const response = await axios.get(API_URL, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const access = req.headers.get("Authorization");
    const id = (await params).id;
    const API_URL = process.env.API_URL + "/todos/" + id + "/"; // Use hidden API URL
    const data = await req.json();
    const response = await axios.put(API_URL, data, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const access = req.headers.get("Authorization");
    const id = (await params).id;
    const API_URL = process.env.API_URL + "/todos/" + id + "/"; // Use hidden API URL
    const data = await req.json();
    const response = await axios.patch(API_URL, data, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const access = req.headers.get("Authorization");
    const id = (await params).id;
    const API_URL = process.env.API_URL + "/todos/" + id + "/"; // Use hidden API URL
    const response = await axios.delete(API_URL, {
        headers: { Authorization: access },
    });
    return NextResponse.json(response.data);
}