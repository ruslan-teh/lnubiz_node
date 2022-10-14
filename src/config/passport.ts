import passportGoogle from "passport-google-oauth20";
import passport from "passport";
import {config} from "./config";

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy({
            clientID: config.GOOGLE_CLIENT_ID as string,
            clientSecret: config.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/auth/google/redirect"
        },((accessToken: string, refreshToken: string, profile: any, done: any) =>
            console.log(profile)
        )

    )
)

export default passport;