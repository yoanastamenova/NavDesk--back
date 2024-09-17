import { AppDataSource } from "../db";
import { Access_history } from "../models/Access_history";

export const accessHistorySeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const accessHistory1 = new Access_history();
        accessHistory1.person_id = 1;
        accessHistory1.room_id = 2;
        accessHistory1.entry_datetime = new Date();
        accessHistory1.exit_datetime = new Date();
        await accessHistory1.save();

        const accessHistory2 = new Access_history();
        accessHistory2.person_id = 5;
        accessHistory2.room_id = 1;
        accessHistory2.entry_datetime = new Date();
        accessHistory2.exit_datetime = new Date();
        await accessHistory2.save();

        const accessHistory3 = new Access_history();
        accessHistory3.person_id = 3;
        accessHistory3.room_id = 3;
        accessHistory3.entry_datetime = new Date();
        accessHistory3.exit_datetime = new Date();
        await accessHistory3.save();

        const accessHistory4 = new Access_history();
        accessHistory4.person_id = 4;
        accessHistory4.room_id = 5;
        accessHistory4.entry_datetime = new Date();
        accessHistory4.exit_datetime = new Date();
        await accessHistory4.save();

        const accessHistory5 = new Access_history();
        accessHistory5.person_id = 2;
        accessHistory5.room_id = 4;
        accessHistory5.entry_datetime = new Date();
        accessHistory5.exit_datetime = new Date();
        await accessHistory5.save();

        console.log("===========================");
        console.log("Access History seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in Access History seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}