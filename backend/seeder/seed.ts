import DB from "../db/db";
import { CreateApplication } from "../db/applications";
import { randomUUID } from "crypto";
import Application from "../models/application";
import { Status } from "../models/enums/status.enum";
import { RetrieveUser } from "../db/users";
import User from "../models/user";


export async function GetAllUserIds(db: DB): Promise<string[]> {
    const snapshot = await db.UserCollection().get();
    const userIds: string[] = [];

    snapshot.forEach(doc => {
        const userId = doc.id;
        userIds.push(userId);
    });

    return userIds;
}

export async function RetrieveRandomUser(db: DB): Promise<User> {
    const userIds = await GetAllUserIds(db);
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    const randomUser = await RetrieveUser(db, randomUserId);

    if (randomUser === null) {
        throw new Error('Failed to retrieve random user');
    }

    return randomUser;
}

function GetRandomStatus(): Status {
    const statusValues = Object.values(Status);
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as Status;
}

async function generateApplicationListing(db: DB): Promise<Application> {
    const randomUser = await RetrieveRandomUser(db);
    return new Application(
        randomUUID(),
        GetRandomStatus(),
        randomUser
    );
}

export async function seedApplicationListings(db: DB): Promise<void> {
    for (let i = 0; i < 20; i++) {
        const applicationListing = await generateApplicationListing(db);
        await CreateApplication(db, applicationListing);
    }
    console.log(`Seeded application listings`);
}