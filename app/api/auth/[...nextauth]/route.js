import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
         if (
    credentials.email === process.env.ADMIN_EMAIL &&
    credentials.password === process.env.ADMIN_PASSWORD
  ) {
    return {
      id: "1",
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
    };
  }

  return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };