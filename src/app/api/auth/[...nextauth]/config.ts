import { NextAuthOptions } from "next-auth";

const {
  WITHINGS_CLIENT_ID,
  WITHINGS_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} = process.env;

// TODO: move this to next-auth as a provider
export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "withings",
      name: "Withings",
      type: "oauth",
      userinfo: {
        url: "https://wbsapi.withings.net/v2/user",
        async request(context) {
          const token: any = context.tokens["0"];
          return {
            id: token.userId,
            name: token.userid,
          };
        },
      },
      authorization: {
        url: "https://account.withings.com/oauth2_user/authorize2",
        params: {
          response_type: "code",
          scope: "user.activity,user.metrics,user.info",
        },
      },
      token: {
        url: "https://wbsapi.withings.net/v2/oauth2",
        // @ts-ignore
        async request(context) {
          const formdata = new URLSearchParams();
          formdata.append("action", "requesttoken");
          formdata.append("grant_type", "authorization_code");
          formdata.append("client_id", WITHINGS_CLIENT_ID!);
          formdata.append("client_secret", WITHINGS_CLIENT_SECRET!);
          formdata.append("code", context.params.code!);
          formdata.append("redirect_uri", context.provider.callbackUrl);

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
      clientId: WITHINGS_CLIENT_ID,
      clientSecret: WITHINGS_CLIENT_SECRET,
      debug: true,
      profile(profile) {
        return profile;
      },
    },
  ],
  secret: NEXTAUTH_SECRET,
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
      if (account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

