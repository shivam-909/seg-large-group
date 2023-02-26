import {Handler, Request, Response} from "express";
import DB from "../../db/db";
import User from "../../models/user";
import {RetrieveUserById, UpdateUser} from "../../db/users";

export function VerifyUserByEmail(db: DB): Handler {
    return async (req: Request, res: Response) => {
        const id = req.params.id;

        let user: User | null = await RetrieveUserById(db, id);

        if (user === null) {
            return res.status(403).send("invalid credentials");
        }

        if (user.isVerified) {
            return res.status(400).send("user already verified");
        }

        user.isVerified = true;

        await UpdateUser(db, user).then(() => {
            return res.status(200).send("user verified");
        });
    };
}