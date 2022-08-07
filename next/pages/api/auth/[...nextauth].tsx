// import {PrismaClient} from "@prisma/client"
import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import {PostgresAdapter} from "lib/prisma"

// const prisma = new PrismaClient()

console.log("process.env.AUTH_SECRET", process.env.AUTH_SECRET)
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)

export default NextAuth({
  // debug: true,

  secret: process.env.AUTH_SECRET!,

  // TODO Hasura can authorize via JWT or a Webhook
  session: {
    strategy: "jwt"
    // maxAge: 30 * 24 * 60 * 60, // 30 days -- # of seconds until an idle session expires and becomes invalid
  },

  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.JWT_SECRET!,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  adapter: PostgresAdapter(),

  // pages: {
  //   signIn: "/auth/signin",
  // },

  providers: [
    EmailProvider({
      server: process.env.SMTP_URI,
      from: process.env.SMTP_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
      // sendVerificationRequest //	Hook into verification request sending : (params) => Promise<undefined>
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,

      // https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/providers/github.ts
      // profile(profile) {
      //   console.log("@ GithubProvider.profile", profile)
      //   return {
      //     // TODO should contain all User fields
      //     id: profile.id.toString(),
      //     name: profile.name ?? profile.login,
      //     email: profile.email,
      //     image: profile.avatar_url,
      //     role: "student",
      //   }
      // },
    }),
  ],

  callbacks: {
    async signIn(...args) {
      console.log("@ callbacks.(should)SignIn", args)
      return true
    },

    async jwt({token, user, account, profile /*, isNewUser*/}) {
      console.log("@ callbacks.jwt", {token, user, account, profile})
      return user
        ? {...token, role: user.role}
        : token
    },

    async session({session, token}: any) {
      console.log("@ callbacks.session", {session, token})
      return {
        ...session,
        user: {
          ...session.user,
          role: token?.role,
        },
      }
    },
  },
})

// TODO check https://next-auth.js.org/adapters/mongodb adapter as well, for extra reference
