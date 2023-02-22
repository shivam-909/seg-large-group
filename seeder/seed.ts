import DB from "../db/db";
import { faker } from '@faker-js/faker';
import { CreateApplication } from "../db/applications";
import { randomUUID } from "crypto";
import Application from "../models/application";
import {Status} from "../models/enums/status.enum";


function getRandomStatus(): Status {
    const statusValues = Object.values(Status);
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as Status;
}

function generateApplicationListing(): Application {
    return new Application(
        randomUUID(),
        getRandomStatus()

    );
}

export async function seedApplicationListings(db: DB): Promise<void> {
    for (let i = 0; i < 20; i++) {
        const applicationListing = generateApplicationListing();
        await CreateApplication(db, applicationListing);
    }
    console.log(`Seeded application listings`);
}