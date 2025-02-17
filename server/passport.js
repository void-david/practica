const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: '482748259590-l5q31e9jahqptj0n7rshcpfjt3rb4chs.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        // Here you would find or create a user in your database
        // For now, we'll just return the profile
        return done(null, profile);
      }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});