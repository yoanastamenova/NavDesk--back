import { AppDataSource } from "../db";
import { Access } from "../models/Access";

export const accessSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const access1 = new Access();
        access1.person_id = 1;
        access1.room_id = 2;
        access1.entry_datetime = new Date();
        access1.exit_datetime = new Date();
        access1.state = "approved";
        await access1.save();

        const access2 = new Access();
        access2.person_id = 5;
        access2.room_id = 1;
        access2.entry_datetime = new Date();
        access2.exit_datetime = new Date();
        access2.state = "pending";
        await access2.save();

        const access3 = new Access();
        access3.person_id = 3;
        access3.room_id = 3;
        access3.entry_datetime = new Date();
        access3.exit_datetime = new Date();
        access3.state = "denied";
        await access3.save();

        const access4 = new Access();
        access4.person_id = 4;
        access4.room_id = 5;
        access4.entry_datetime = new Date();
        access4.exit_datetime = new Date();
        access4.state = "approved";
        await access4.save();

        const access5 = new Access();
        access5.person_id = 2;
        access5.room_id = 4;
        access5.entry_datetime = new Date();
        access5.exit_datetime = new Date();
        access5.state = "pending";
        await access5.save();

        console.log("===========================");
        console.log("Access seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in access seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}