import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "Withings",
      name: "Withings",
      type: "oauth",
      userinfo: "https://account.withings.com/oauth2_user/authorize2",
      authorization: {
        url: "https://account.withings.com/oauth2_user/authorize2",
        params: {
          response_type: "code",
          scope: "user.activity,user.metrics,user.info",
        },
      },
      token: "https://wbsapi.withings.net/v2/oauth2",
      clientId: process.env.WITHINGS_CLIENT_ID,
      clientSecret: process.env.WITHINGS_CLIENT_SECRET,
      profile(profile) {
        console.log("profile ", profile);
        return {
          id: profile.id,
          name: profile?.name,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("user", user, account, profile);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log({ session, token, user });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
