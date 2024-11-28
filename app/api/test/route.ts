import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const Bearer = req.headers.get("Authorization");
    if (!Bearer || !Bearer.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Missing or malformed Authorization header" }, { status: 400 });
    }
    const token = Bearer?.split(' ')[1]
    const findSession = await prisma.session.findUnique({
        where: {
            token
        }
    })
    if (!findSession) {
        return NextResponse.json("Unauthorized", {status: 401})
    }
    return NextResponse.json(findSession)
}