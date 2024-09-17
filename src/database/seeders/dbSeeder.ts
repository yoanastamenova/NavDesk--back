import { accessHistorySeeder } from "./accessHistorySeeder";
import { accessSeeder } from "./accessSeeder";
import { administrationSeeder } from "./administrationSeeder";
import { personSeeder } from "./personSeeder"
import { roomSeeder } from "./roomSeeder";

(async () => {
    console.log("Starting seeders...")
    await personSeeder();
    await roomSeeder();
    await accessSeeder();
    await accessHistorySeeder();
    await administrationSeeder();
})