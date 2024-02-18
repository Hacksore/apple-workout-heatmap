import NextAuth from "next-auth";
import crypto from "crypto";

// NOTE: prolly not needed
const createSignature = (action: string) => {
  const timestamp = Date.now();

  const data = action + "," + process.env.WITHINGS_CLIENT_ID + "," + timestamp;
  const signature = crypto
    .createHmac("sha256", process.env.WITHINGS_CLIENT_SECRET!)
    .update(data)
    .digest("hex");

  return signature;
};

const handler = NextAuth({
  providers: [
    {
      id: "Withings",
      name: "Withings",
      type: "oauth",
      userinfo: {
        url: "https://wbsapi.withings.net/v2/user",
        // TODO: we need to do a custom lookup
        async request(context) {
          const token: any = context.tokens["0"];
          console.log("userinfo:", token);
          return {
            id: token.userId,
          };
        },
      },
      authorization: {
        url: "https://account.withings.com/oauth2_user/authorize2",
        params: {
          response_type: "code",
          scope: "user.activity,user.metrics,user.info",
          redirect_uri: "http://localhost:3000/api/auth/callback/Withings",
        },
      },
      token: {
        url: "https://wbsapi.withings.net/v2/oauth2",
        async request(context) {
          const formdata = new URLSearchParams();
          formdata.append("action", "requesttoken");
          formdata.append("grant_type", "authorization_code");
          formdata.append("client_id", process.env.WITHINGS_CLIENT_ID!);
          formdata.append("client_secret", process.env.WITHINGS_CLIENT_SECRET!);
          formdata.append("code", context.params.code!);
          formdata.append(
            "redirect_uri",
            "http://localhost:3000/api/auth/callback/Withings",
          );

          // get a token with custom logic
          const response = await fetch(
            "https://wbsapi.withings.net/v2/oauth2",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formdata,
            },
          )
            .then((res) => res.json())
            .catch((err) => {
              console.error({ err });
            });

          return {
            tokens: [
              {
                userId: response.body.userid,
                accessToken: response.body.access_token,
                accessTokenExpires: response.body.expires_in,
                refreshToken: response.body.refresh_token,
                refreshTokenExpires: response.body.expires_in,
              },
            ],
          };
        },
      },
      clientId: process.env.WITHINGS_CLIENT_ID,
      clientSecret: process.env.WITHINGS_CLIENT_SECRET,
      profile(profile) {
        return profile;
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      
      if (account) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
