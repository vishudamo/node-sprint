export interface IPasswordHasher {
    generateHashedPassword(password: string): Promise<string>;
    checkHashedPassword(inputPassword: string, dbPassword: string): Promise<boolean>;
}