import { AppDataSource } from "../db";
import { Administration } from "../models/Administration";

export const administrationSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const administration1 = new Administration();
        administration1.report_date = new Date();
        administration1.total_accesses = 2;
        administration1.total_absences = 0;
        administration1.frequent_users = 'No data';
        administration1.infrequent_users = 'No data';
        await administration1.save();

        const administration2 = new Administration();
        administration2.report_date = new Date();
        administration2.total_accesses = 0;
        administration2.total_absences = 0;
        administration2.frequent_users = 'No data';
        administration2.infrequent_users = 'No data';
        await administration2.save();

        const administration3 = new Administration();
        administration3.report_date = new Date();
        administration3.total_accesses = 5;
        administration3.total_absences = 1;
        administration3.frequent_users = 'No data';
        administration3.infrequent_users = "No data";
        await administration3.save();

        const administration4 = new Administration();
        administration4.report_date = new Date();
        administration4.total_accesses = 2;
        administration4.total_absences = 1;
        administration4.frequent_users = 'No data';
        administration4.infrequent_users = 'No data';
        await administration4.save();

        const administration5 = new Administration();
        administration5.report_date = new Date();
        administration5.total_accesses = 2;
        administration5.total_absences = 0;
        administration5.frequent_users = 'No data';
        administration5.infrequent_users = 'No data';
        await administration5.save();

        console.log("===========================");
        console.log("Administration seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in Administration seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}