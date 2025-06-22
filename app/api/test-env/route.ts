import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
    NEXT_PUBLIC_SOCKET_PORT: process.env.NEXT_PUBLIC_SOCKET_PORT,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    socketUrl: `http://${process.env.NEXT_PUBLIC_SOCKET_URL}:${process.env.NEXT_PUBLIC_SOCKET_PORT}`
  });
}
