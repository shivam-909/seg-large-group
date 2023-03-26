import DB from "../../../db/db";
import * as errors from "../../public";
import {ErrorMissingProperty} from "../../public";

export async function isQuery(db: DB, body: any): Promise<void> {
    const {input} = body;
    const query = body.term.toString().toLowerCase();
    if (!query) {
        throw new Error(errors.ErrorQueryRequired);
    }
}