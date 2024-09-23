export interface TokenDecoded {
    id: number,
    role_id: number,
    email: string
}

declare global {
    namespace Express {
       export interface Request {
        tokenData: TokenDecoded;
       }
    }
}