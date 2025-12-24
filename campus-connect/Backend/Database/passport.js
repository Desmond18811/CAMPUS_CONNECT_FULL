import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // Corrected import
import { Strategy as LocalStrategy } from 'passport-local'; // Corrected import
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; // Added for JWT
import User from '../Models/User.js';

// Local strategy for email/password login
passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'Incorrect email or password' });
            }

            // Check if password is correct
            const isPasswordCorrect = await user.correctPassword(password, user.password);

            if (!isPasswordCorrect) {
                return done(null, false, { message: 'Incorrect email or password' });
            }

            // If everything is correct, return user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                }

                let username = profile.displayName.replace(/\s+/g, '').toLowerCase();
                let existing = await User.findOne({ username });
                if (existing) {
                    username += Math.random().toString(36).substring(2, 7);
                }

                user = await User.create({
                    googleId: profile.id,
                    username,
                    email: profile.emails[0].value,
                    school: 'Unknown'
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// JWT strategy
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Expect JWT in Authorization: Bearer <token>
            secretOrKey: process.env.JWT_SECRET || 'development_secret'
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Removed serializeUser and deserializeUser since we're using stateless JWT

export default passport;