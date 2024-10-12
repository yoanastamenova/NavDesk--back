import { AppDataSource } from "../db";
import { Booking_History } from "../models/Booking_history"; // Changed Access_history to Access_History

export const bookingHistorySeeder = async () => {
    try {
        await AppDataSource.initialize();

        const history1 = new Booking_History();
        history1.user_id = 1;
        history1.room_id = 1;
        history1.entry_datetime = new Date("2023-01-01T09:00:00");
        history1.exit_datetime = new Date("2023-01-01T17:00:00");
        history1.access_state = "Completed";
        await history1.save();

        const history2 = new Booking_History();
        history2.user_id = 2;
        history2.room_id = 2;
        history2.entry_datetime = new Date("2023-01-02T10:00:00");
        history2.exit_datetime = new Date("2023-01-02T12:00:00");
        history2.access_state = "No-show";
        await history2.save();

        const history3 = new Booking_History();
        history3.user_id = 3;
        history3.room_id = 3;
        history3.entry_datetime = new Date("2023-01-03T11:00:00");
        history3.exit_datetime = new Date("2023-01-03T14:00:00");
        history3.access_state = "Cancelled";
        await history3.save();

        const history4 = new Booking_History();
        history4.user_id = 4;
        history4.room_id = 4;
        history4.entry_datetime = new Date("2023-01-04T08:00:00");
        history4.exit_datetime = new Date("2023-01-04T18:00:00");
        history4.access_state = "Completed";
        await history4.save();

        const history5 = new Booking_History();
        history5.user_id = 5;
        history5.room_id = 5;
        history5.entry_datetime = new Date("2023-01-05T13:00:00");
        history5.exit_datetime = new Date("2023-01-05T15:00:00");
        history5.access_state = "Completed";
        await history5.save();

        console.log("===========================");
        console.log("Booking History seeder executed successfully");
        console.log("===========================");

    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in booking history seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}