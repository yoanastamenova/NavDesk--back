import { personSeeder } from "./personSeeder"
import { roomSeeder } from "./roomSeeder";

(async () => {
    console.log("Starting seeders...")
    await personSeeder();
    await roomSeeder();
    
})