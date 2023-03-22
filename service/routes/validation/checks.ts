import DB from "../../../db/db";
import * as errors from "../../public";
import * as companiesdb from "../../../db/companies";
import * as searchersdb from "../../../db/searchers";

export function isStringArray(arr:string[]): boolean{
    for(let i=0; i< arr.length;i++){
        if(typeof arr[i]!== 'string') return false;
    }
    return true
}

export async function ValidateCompanyId(db:DB, companyID: any){
    if(typeof companyID !== 'string'){
        throw new Error(errors.ErrorCompanyIDMustBeString);
    }
    const company = await companiesdb.RetrieveCompanyByID(db, companyID);
    if(!company){
        throw new Error(errors.ErrorCompanyNotFound);
    }
}

export async function ValidateSearcherId(db:DB, searcherID: any){

    if(typeof searcherID !== 'string'){
        throw new Error(errors.ErrorSearcherIDMustBeString);
    }

    const searcher = await searchersdb.RetrieveSearcherByID(db, searcherID);
    if (!searcher) {
        throw new Error(errors.ErrorSearcherNotFound);
    }
}