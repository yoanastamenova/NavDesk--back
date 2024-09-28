import { AppDataSource } from "../db";
import { Administration } from "../models/Administration";

export const administrationSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const administration1 = new Administration();
        administration1.report_date = new Date();
        administration1.total_entries = 2;
        administration1.total_absences = 0;
        administration1.frequent_users = JSON.stringify([{ userId: 1 }, { userId: 2 }]);
        administration1.infrequent_users = JSON.stringify([{ userId: 3 }]);
        await administration1.save();

        const administration2 = new Administration();
        administration2.report_date = new Date();
        administration2.total_entries = 0;
        administration2.total_absences = 3;
        administration2.frequent_users = JSON.stringify([]);
        administration2.infrequent_users = JSON.stringify([{ userId: 3 }, { userId: 1}, { userId: 2}]);
        await administration2.save();

        const administration3 = new Administration();
        administration3.report_date = new Date();
        administration3.total_entries = 4;
        administration3.total_absences = 0;
        administration3.frequent_users = JSON.stringify([{ userId: 4 }, { userId: 2 }, { userId: 5 }, { userId: 1 }]);
        administration3.infrequent_users = JSON.stringify([]);
        await administration3.save();

        const administration4 = new Administration();
        administration4.report_date = new Date();
        administration4.total_entries = 2;
        administration4.total_absences = 1;
        administration4.frequent_users = JSON.stringify([{ userId: 1 }, { userId: 2 }, { userId: 5 }, { userId: 3 }]);
        administration4.infrequent_users = JSON.stringify([]);  
        await administration4.save();

        const administration5 = new Administration();
        administration5.report_date = new Date();
        administration5.total_entries = 1;
        administration5.total_absences = 0;
        administration5.frequent_users = JSON.stringify([{ userId: 4 }]);  
        administration5.infrequent_users = JSON.stringify([]);  
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