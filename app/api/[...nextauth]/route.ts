// app/api/[...nextauth]/route.ts
import NextAuth, { type NextAuthConfig } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

const authConfig: NextAuthConfig = {
  // secret은 ENV(AUTH_SECRET)에 넣어두면 됩니다. (옵션으로 명시도 가능)
  secret: process.env.AUTH_SECRET,
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID!,
      clientSecret: process.env.AUTH_NAVER_SECRET!,
    }),
  ],
};

export const { handlers: { GET, POST } } = NextAuth(authConfig);
