import DB from "../../../db/db";

import * as usersdb from "../../../db/users";
import * as errors from "../../public";
import { ValidEmail, ValidPassword } from "../auth";
import {isStringArray, ValidateCompanyId, ValidateSearcherId} from "./checks";
import {ErrorMissingProperty} from "../../public";


export async function UpdateUser(db: DB, id:string, req: any): Promise<void> {
    await UserExists(db, id);

    if(req === undefined){
        throw new Error(ErrorMissingProperty);
    }

    const { email, password, pfpUrl, location, notifications, companyID, searcherID } = req;

    if (!email && !password && !pfpUrl && !location && !notifications && !companyID && !searcherID){
        throw new Error(errors.ErrorMissingProperty);
    }

    if (email && !ValidEmail(email)) {
        throw new Error(errors.ErrorInvalidEmail);
    }
    if (password && !ValidPassword(password)) {
        throw new Error(errors.ErrorInvalidPassword);
    }
    if (pfpUrl && typeof pfpUrl !== 'string') {
        throw new Error(errors.ErrorPfpUrlMustBeString);
    }
    if (location && typeof location !== 'string') {
        throw new Error(errors.ErrorLocationMustBeString);
    }

    if(notifications){
        if(!Array.isArray(notifications)){
            throw new Error(errors.ErrorNotificationsMustBeArray);
        }
        if(!isStringArray(notifications)){
            throw new Error(errors.ErrorNotificationsMustBeStringArray);
        }
    }

    if(companyID){
        await ValidateCompanyId(db,companyID);
    }

    if (searcherID){
        await ValidateSearcherId(db,searcherID);
    }
}

export async function GetUserByType(db:DB, req:any): Promise<void>{
    const { companyID, searcherID } = req;

    if(!companyID && !searcherID){
        throw new Error(errors.ErrorMissingID);
    }
    if(searcherID){
       await ValidateSearcherId(db,searcherID);
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
