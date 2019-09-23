import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as passportLocal from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserRepository } from '../repository';
import { PasswordHasher } from '../adapters/hash';

export class Passport {
    _repository: UserRepository;
    _passwordHasher: PasswordHasher;

    constructor() {
        this._repository = new UserRepository();
        this._passwordHasher = new PasswordHasher();
    }

    public initialize = () => passport.initialize();
    public authenticateJWT = () => passport.authenticate('jwt', {session: false});
    public authenticateCredential = () => passport.authenticate('local', {session: false});

    public initLocalStrategy() {
        const _localStrategyParams = {
            usernameField: 'email',
            passwordField: 'password'
        };

        return new LocalStrategy(_localStrategyParams, async (email, password, cb) => {
            try {
                const userObject = await this._repository.findUserWithEmail(email);
                if(!userObject) return cb(null, false);
                const passwordMatch = this._passwordHasher.checkHashedPassword(password, userObject.password);
                if(passwordMatch) {
                    const data = {
                        userId: userObject.id,
                        role: userObject.userType,
                        email: userObject.email
                    };
                    return cb(null, data);
                }
                return cb(null, false);
            } catch(e) {
                return cb(null, false);
            }
        });
    }

    // public initJWtStrategy() {
    //     const _jwtStrategyParams = {
    //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// 	    secretOrKey: 'Hauqk:vAh8KHG8+&'
    //     };

    //     return new JWTStrategy(_jwtStrategyParams, async(payload,cb) => {
    //         try {
    //             const userObject = { user: userObject. }
    //         }
    //     });
    // }
}