import DB from "../../../db/db";

import * as usersdb from "../../../db/users";
import * as errors from "../../public";
import { ValidEmail, ValidPassword } from "../auth";
import {ValidateCompanyId, ValidateSearcherId, ValidateUserID} from "./checks";
import {ErrorMissingProperty} from "../../public";


export async function UpdateUser(db: DB, id:string, req: any): Promise<void> {
    await UserExists(db, id);

    if(req === undefined){
        throw new Error(ErrorMissingProperty);
    }

    const { email, password, pfpUrl, location, notifications, companyName, cv, firstName, lastName, qualifications, savedJobs, skills } = req;

    const user = await usersdb.RetrieveFullUserByID(db, id);

    if(user?.searcher){
        if(companyName){
            throw new Error(errors.ErrorInvalidSearcherFields);
        }
    }

    else{
        if(user?.company){
            if(cv || firstName || lastName || qualifications || savedJobs || skills){
                throw new Error(errors.ErrorInvalidCompanyFields);
            }
        }
    }

    if (!email && !password && !pfpUrl && !location && !notifications && !companyName && !cv && !firstName && !lastName && !qualifications && !savedJobs && !skills){
        throw new Error(errors.ErrorMissingProperty);
    }


    if (email && !ValidEmail(email)) {
        throw new Error(errors.ErrorInvalidEmail);
    }
    if (password && !ValidPassword(password)) {
        throw new Error(errors.ErrorInvalidPassword);
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
    await ValidateUserID(db, id);
}
