// Call the seed function.
import DB from './db/db';
import * as deseed from './seeder/deseeder';
import * as seeder from './seeder/seed';

export async function FullSeed(db: DB): Promise<void> {
    await deseed.deseed(db);
    await seeder.SeedCompanies(db);
    await seeder.SeedSearchers(db);
    await seeder.SeedJobListings(db);
    await seeder.SeedAllNotifications(db);
    await seeder.SeedApplicationListings(db);
}
