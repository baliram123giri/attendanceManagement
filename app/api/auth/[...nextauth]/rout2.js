
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(data) {
                try {
                    if (data) {
                        return data
                    } else {
                        return Promise.resolve(null) // Authentication failed
                    }
                } catch (error) {
                    return Promise.resolve(null) // Handle errors appropriately
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 4 * 60 * 60,

    },
    callbacks: {
        jwt: async ({ token, user }) => {
            console.log("line 31", user)
            if (user) {
                token.data = user
            }
            return token
        },
        session: async ({ session, token }) => {
            if (token.data) {
                session.user = token.data
            }

            return session
        }
    },
    secret: process.env.COOKIE_SECRET,
    pages: {
        signIn: "https://app.bgtechub.com",
    },
    // Add other configuration options as needed
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };