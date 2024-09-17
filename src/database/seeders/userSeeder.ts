import { AppDataSource } from "../db";
import { User } from "../models/User";

export const userSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const user1 = new User();
        user1.first_name = 'John';
        user1.last_name = 'Doe';
        user1.startup = 'Startup A';
        user1.email = 'john.doe@example.com';
        user1.dni = 'I123456';
        user1.phone = '123-456-7890';
        await user1.save();

        const user2 = new User();
        user2.first_name = 'Nina';
        user2.last_name = 'Fernandez';
        user2.startup = 'Spark';
        user2.email = 'nina.fer@example.com';
        user2.dni = 'D123456';
        user2.phone = '123-456-7870';
        await user2.save();


        const user3 = new User();
        user3.first_name = 'Hank';
        user3.last_name = 'Part';
        user3.startup = 'Async';
        user3.email = 'hank@example.com';
        user3.dni = 'K347654';
        user3.phone = '123-456-9890';
        await user3.save();

        const user4 = new User();
        user4.first_name = 'Elena';
        user4.last_name = 'Perez';
        user4.startup = 'Link&Co';
        user4.email = 'lena@example.com';
        user4.dni = 'O154993';
        user4.phone = '123-456-2222';
        await user4.save();

        const user5 = new User();
        user5.first_name = 'Peter';
        user5.last_name = 'Brosnan';
        user5.startup = 'Google';
        user5.email = 'peete@example.com';
        user5.dni = 'S343612';
        user5.phone = '123-456-3434';
        await user5.save();

        console.log("===========================");
        console.log("User seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in user seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}