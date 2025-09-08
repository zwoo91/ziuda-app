// app/api/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID as string,
      clientSecret: process.env.AUTH_KAKAO_SECRET as string,
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID as string,
      clientSecret: process.env.AUTH_NAVER_SECRET as string,
    }),
  ],
} satisfies Parameters<typeof NextAuth>[0];

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;


