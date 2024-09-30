import { AppDataSource } from "../db";
import { Booking } from "../models/Booking";

export const bookingSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const booking1 = new Booking();
        booking1.user_id = 1;
        booking1.room_id = 1; 
        booking1.entry_datetime = new Date("2023-01-01T09:00:00");
        booking1.exit_datetime = new Date("2023-01-01T17:00:00");
        booking1.state = "reserved";
        booking1.current_occupants = 0;
        await booking1.save();

        const booking2 = new Booking();
        booking2.user_id = 2;
        booking2.room_id = 2;
        booking2.entry_datetime = new Date("2023-01-02T10:00:00");
        booking2.exit_datetime = new Date("2023-01-02T12:00:00");
        booking2.state = "cancelled";
        booking2.current_occupants = 0;
        await booking2.save();

        const booking3 = new Booking();
        booking3.user_id = 3;
        booking3.room_id = 3;
        booking3.entry_datetime = new Date("2023-01-03T11:00:00");
        booking3.exit_datetime = new Date("2023-01-03T14:00:00");
        booking3.state = "checked-in";
        booking3.current_occupants = 3;
        await booking3.save();

        const booking4 = new Booking();
        booking4.user_id = 4;
        booking4.room_id = 4;
        booking4.entry_datetime = new Date("2023-01-04T08:00:00");
        booking4.exit_datetime = new Date("2023-01-04T18:00:00");
        booking4.state = "checked-out";
        booking4.current_occupants = 0;
        await booking4.save();

        const booking5 = new Booking();
        booking5.user_id = 5;
        booking5.room_id = 5;
        booking5.entry_datetime = new Date("2023-01-05T13:00:00");
        booking5.exit_datetime = new Date("2023-01-05T15:00:00");
        booking5.state = "reserved";
        booking5.current_occupants = 0;
        await booking5.save();

        console.log("===========================");
        console.log("Booking seeder executed successfully");
        console.log("===========================");

    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in booking seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}