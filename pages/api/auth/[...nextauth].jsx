import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import Connect from "../../../utils/db";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                Email: { label: "Email", type: "text" },
                Password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await Connect();
                try {
                    const user = await User.findOne({ Email: credentials.Email });
                    if (user) {
                        if ('Password' in user) {
                            const isPasswordCorrect = await bcrypt.compare(
                                credentials.Password,
                                user.Password
                            );
                            if (isPasswordCorrect) {
                                return user;
                            }
                        }
                    }
                    return null;
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == "credentials") {
                return true;
            }
            if (account?.provider == "google") {
                await Connect();
                try {
                    const existingUser = await User.findOne({ Email: user.email });
                    if (!existingUser) {
                        const newUser = new User({
                            Fullname: user.name,
                            Email: user.email,
                            Score: 0
                        });

                        await newUser.save();
                        return true;
                    }
                    return true;
                } catch (err) {
                    console.log("Error saving user", err);
                    return false;
                }
            }
        },
        async session({ session, token }) {
            if (!session.user.name) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    name: user.Fullname,
                    email: user.Email,
                    score: user?.Score ?? 0
                }
            }
            return token;
        }
    },
}

export default NextAuth(authOptions)