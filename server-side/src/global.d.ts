export type Nullable<T> = T | null;

export type GammaToken = {
    userId: string
    email: string
    roleName: string
    userName: string
    firstName: string
    lastName: string
    secretKey: string
    expiresIn: string
};

declare global {
    namespace Express {
        interface Request {
            userData: any
        }
    }
}

