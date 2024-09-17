import { AppDataSource } from "../db";
import { Person } from "../models/Person";

export const personSeeder = async () => {
    try {
        await AppDataSource.initialize();
        
        const person1 = new Person();
        person1.first_name = 'John';
        person1.last_name = 'Doe';
        person1.startup = 'Startup A';
        person1.email = 'john.doe@example.com';
        person1.dni = 'I123456';
        person1.phone = '123-456-7890';
        await person1.save();

        const person2 = new Person();
        person2.first_name = 'Nina';
        person2.last_name = 'Fernandez';
        person2.startup = 'Spark';
        person2.email = 'nina.fer@example.com';
        person2.dni = 'D123456';
        person2.phone = '123-456-7870';
        await person2.save();


        const person3 = new Person();
        person3.first_name = 'Hank';
        person3.last_name = 'Part';
        person3.startup = 'Async';
        person3.email = 'hank@example.com';
        person3.dni = 'K347654';
        person3.phone = '123-456-9890';
        await person3.save();

        const person4 = new Person();
        person4.first_name = 'Elena';
        person4.last_name = 'Perez';
        person4.startup = 'Link&Co';
        person4.email = 'lena@example.com';
        person4.dni = 'O154993';
        person4.phone = '123-456-2222';
        await person4.save();

        const person5 = new Person();
        person5.first_name = 'Peter';
        person5.last_name = 'Brosnan';
        person5.startup = 'Google';
        person5.email = 'peete@example.com';
        person5.dni = 'S343612';
        person5.phone = '123-456-3434';
        await person5.save();

        console.log("===========================");
        console.log("Person seeder executed successfully");
        console.log("===========================");
        
    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in person seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}