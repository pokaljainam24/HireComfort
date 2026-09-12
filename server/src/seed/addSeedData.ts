import mongoose from 'mongoose';
import employmentData from './data/employmentType.json' with {type: "json"}
import industryData from './data/industry.json' with {type: "json"}
import interviewTypeData from './data/interviewType.json' with {type: "json"}
import jobCategoryData from './data/jobCategory.json' with {type: "json"}
import jobSubCategoryData from './data/jobSubCategory.json' with {type: "json"}
import qualityData from './data/quality.json' with {type: "json"}
import skillsData from './data/skills.json' with {type: "json"}

/**
 * Inserts seed data into a MongoDB collection.
 * 
 * @param data Array of JSON objects to insert as seed data.
 * @param dbUrl MongoDB connection string URL.
 * @param collectionName Target collection name.
 */

const url = 'mongodb+srv://pokaljainam_db_user:oji8xbGsqID1w4j1@cluster0.8rd4lng.mongodb.net/Hire-Comfort'
export async function seedCollection(
    data: Record<string, any>[],
    dbUrl: string,
    collectionName: string
): Promise<void> {
    try {
        const conn = await mongoose.createConnection(dbUrl).asPromise();
        const db = conn.db;

        if (!db) {
            throw new Error('Failed to establish database connection instance.');
        }

        const collection = db.collection(collectionName);

        if (data.length > 0) {
            const result = await collection.insertMany(data);
            console.log(
                `Successfully inserted ${result.insertedCount} documents into '${collectionName}'.`
            );
        } else {
            console.log(`No data provided for collection '${collectionName}'.`);
        }

        await conn.close();
    } catch (error) {
        console.error(`Error seeding collection '${collectionName}':`, error);
        throw error;
    }
}


async function getData() {
    // await seedCollection(employmentData, url, 'employmenttypemasters')
    // await seedCollection(industryData, url, 'industrymasters')
    // await seedCollection(interviewTypeData, url, 'interviewmasters')
    // await seedCollection(jobCategoryData, url, 'jobcategories')
    // await seedCollection(jobSubCategoryData, url, 'jobsubcategories')
    // await seedCollection(qualityData, url, 'qualificationmasters')
    // await seedCollection(skillsData, url, 'skillsmasters')
}

getData().then(() => console.log('All seed data inserted successfully!')).catch((error) => console.error(error))