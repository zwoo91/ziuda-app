// app/api/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

export const { handlers: { GET, POST } } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID ?? "",
      clientSecret: process.env.AUTH_KAKAO_SECRET ?? "",
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_ID ?? "",
      clientSecret: process.env.AUTH_NAVER_SECRET ?? "",
    }),
  ],
});

git add -A
git commit -m "feat(auth): add NextAuth route (Kakao/Naver)"
git push

