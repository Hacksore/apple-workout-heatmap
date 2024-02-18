import { NextAuthOptions } from "next-auth";

const { WITHINGS_CLIENT_ID, WITHINGS_CLIENT_SECRET, NEXTAUTH_SECRET } =
  process.env;


declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
    } & User
  }

  interface User {
    // TODO: add custom here
  }
}

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
          // get a token with custom logic
          const response = await fetch(
            "https://wbsapi.withings.net/v2/oauth2",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                action: "requesttoken",
                grant_type: "authorization_code",
                client_id: context.provider.clientId!,
                client_secret: context.provider.clientSecret!,
                code: context.params.code!,
                redirect_uri: context.provider.callbackUrl,
              }),
            },
          ).then((res) => res.json());

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
        // @ts-ignore
        token.accessToken = account["0"].accessToken;
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
