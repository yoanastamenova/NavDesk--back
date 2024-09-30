import { AppDataSource } from "../db";
import { Room } from "../models/Room";

export const roomSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const room1 = new Room();
        room1.room_name = 'Madrid';
        room1.capacity = 150;
        room1.room_type = "event";
        room1.actual_state = "Available";
        await room1.save();

        const room2 = new Room();
        room2.room_name = 'Barcelona';
        room2.capacity = 20;
        room2.room_type = "meetup";
        room2.actual_state = "Available";
        await room2.save();

        const room3 = new Room();
        room3.room_name = 'Valencia';
        room3.capacity = 50;
        room3.room_type = "workshop";
        room3.actual_state = "Non-bookable";
        await room3.save();

        const room4 = new Room();
        room4.room_name = 'Malaga';
        room4.capacity = 5;
        room4.room_type = "office";
        room4.actual_state = "Occupied";
        await room4.save();

        const room5 = new Room();
        room5.room_name = 'Sevilla';
        room5.capacity = 30;
        room5.room_type = "workshop";
        room5.actual_state = "Available";
        await room5.save();

        console.log("===========================");
        console.log("Room seeder executed successfully");
        console.log("===========================");

    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in room seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}