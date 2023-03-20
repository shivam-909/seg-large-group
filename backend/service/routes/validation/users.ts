import DB from "../../../db/db";
import * as searchersdb from "../../../db/searchers";
import * as jobsdb from "../../../db/jobs";
import * as usersdb from "../../../db/users";
import * as errors from "../../public";
import { ValidEmail, ValidPassword } from  "../../../service/routes/auth";
import {isStringArray, ValidateCompanyId} from "./jobs";




export async function UpdateUser(db: DB, id:string, req: any): Promise<void> {
    const { email, password, pfpUrl, location, notifications, companyID, searcherID } = req;

    const user = await usersdb.RetrieveFullUserByID(db, id);
    if (!user) {
        throw new Error(errors.ErrorUserNotFound);
    }
    if (email && ValidEmail(email)) {
        throw new Error(errors.ErrorInvalidEmail);
    }
    if (password && ValidPassword(password)) {
        throw new Error(errors.ErrorInvalidPassword);
    }
    if (pfpUrl && typeof pfpUrl !== 'string') {

    }
    if (location && typeof location !== 'string') {
        throw new Error(errors.ErrorLocationMustBeString);
    }

    if(notifications){
        if(!Array.isArray(notifications)){

        }
        if(!isStringArray(notifications)){

        }
    }

    if(!companyID && ! searcherID){

    }

    if(companyID){
        await ValidateCompanyId(db,companyID);
    }

    if (searcherID){
        const searcher = await searchersdb.RetrieveSearcherByID(db, searcherID);
        if (!searcher) {
            throw new Error(errors.ErrorSearcherNotFound);
        }
    }


}

export async function GetUserByTypeID(db:DB, req:any): Promise<void>{
    const { companyID, searcherID } = req.body;
    if(!companyID && !searcherID){

    }
    if(searcherID){
        const searcher = await searchersdb.RetrieveSearcherByID(db, searcherID);
        if (!searcher) {
            throw new Error(errors.ErrorSearcherNotFound);
        }
    }
    if(companyID){
        await ValidateCompanyId(db, companyID);
    }

}

export async function UserExists(db: DB, id: string): Promise<void> {
    const user = await usersdb.RetrieveFullUserByID(db, id);
    if (!user) {
        throw new Error(errors.ErrorUserNotFound);
    }
}
