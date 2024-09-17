import { personSeeder } from "./personSeeder"

(async () => {
    console.log("Starting seeders...")
    await personSeeder();
    
})