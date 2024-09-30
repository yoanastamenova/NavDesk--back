import { AppDataSource } from "../db";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const userSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const user1 = new User();
        user1.username = 'John Doe';
        user1.startup = 'Startup JDA';
        user1.email = 'john.doe@example.com';
        user1.password = bcrypt.hashSync("princess", 12);
        user1.role = "admin";
        user1.dni = 'I123456';
        user1.phone = '123-456-7890';
        await user1.save();

        const user2 = new User();
        user2.username = 'Jane Smith';
        user2.startup = 'HealthTech';
        user2.email = 'jane.smith@example.com';
        user2.password = bcrypt.hashSync("12345678", 12);
        user2.role = "user";
        user2.dni = 'J234567';
        user2.phone = '234-567-8901';
        await user2.save();

        const user3 = new User();
        user3.username = 'Alice Johnson';
        user3.startup = 'FinTech Solutions';
        user3.email = 'alice.johnson@example.com';
        user3.password = bcrypt.hashSync("alice123", 12);
        user3.role = "user";
        user3.dni = 'A345678';
        user3.phone = '345-678-9012';
        await user3.save();

        const user4 = new User();
        user4.username = 'Bob Brown';
        user4.startup = 'EduTech';
        user4.email = 'bob.brown@example.com';
        user4.password = bcrypt.hashSync("password", 12);
        user4.role = "user";
        user4.dni = 'B456789';
        user4.phone = '456-789-0123';
        await user4.save();

        const user5 = new User();
        user5.username = 'Clara Oswald';
        user5.startup = 'DataAnalytics';
        user5.email = 'clara.oswald@example.com';
        user5.password = bcrypt.hashSync("clarasecret", 12);
        user5.role = "user";
        user5.dni = 'C567890';
        user5.phone = '567-890-1234';
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