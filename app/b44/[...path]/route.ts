// app/b44/[...path]/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: { path?: string[] } };

async function proxy(req: Request, { params }: Ctx) {
  const base = process.env.BASE44_API_BASE!;
  const segs = params.path?.join('/') ?? '';
  const src = new URL(req.url);
  const target = `${base}/${segs}${src.search}`;

  // 원본 요청 헤더를 최대한 전달(충돌날 수 있는 것 몇 개 제거)
  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-proto');
  headers.delete('content-length');

  const body =
    req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.arrayBuffer();

  const res = await fetch(target, {
    method: req.method,
    headers,
    body,
    redirect: 'manual',
    // 캐시 없이 바로 원본으로
    cache: 'no-store',
  });

  // 원본 응답을 그대로 전달(스트리밍 유지)
  const outHeaders = new Headers(res.headers);
  return new Response(res.body, { status: res.status, headers: outHeaders });
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
  proxy as OPTIONS,
  proxy as HEAD,
};
