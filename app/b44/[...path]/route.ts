// app/b44/[...path]/route.ts
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function forward(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const base = process.env.BASE44_API_BASE!;
  const segs = (params?.path ?? []).join("/");

  const src = new URL(request.url);
  const target = `${base}/${segs}${src.search}`;

  // 원본 헤더를 최대한 전달 (충돌 나는 것 제거)
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("x-forwarded-host");
  headers.delete("x-forwarded-proto");

  // Body 전달 (GET/HEAD 제외)
  let body: BodyInit | undefined = undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const ab = await request.arrayBuffer();
    body = ab;
  }

  const res = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
    cache: "no-store",
  });

  return new Response(res.body, { status: res.status, headers: res.headers });
}

// 각 메소드별 시그니처를 Next가 기대하는 형태로 명시
export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function PATCH(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function OPTIONS(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
export async function HEAD(req: NextRequest, ctx: { params: { path: string[] } }) { return forward(req, ctx); }
