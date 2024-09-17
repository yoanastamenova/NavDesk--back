import { accessHistorySeeder } from "./accessHistorySeeder";
import { accessSeeder } from "./accessSeeder";
import { administrationSeeder } from "./administrationSeeder";
import { personSeeder } from "./personSeeder";
import { roomSeeder } from "./roomSeeder";

(async () => {
    try {
        console.log("Starting seeders...");
        console.log("Running personSeeder...");
        await personSeeder();
        console.log("personSeeder completed.");

        console.log("Running roomSeeder...");
        await roomSeeder();
        console.log("roomSeeder completed.");

        console.log("Running accessSeeder...");
        await accessSeeder();
        console.log("accessSeeder completed.");

        console.log("Running accessHistorySeeder...");
        await accessHistorySeeder();
        console.log("accessHistorySeeder completed.");

        console.log("Running administrationSeeder...");
        await administrationSeeder();
        console.log("administrationSeeder completed.");

        console.log("All seeders executed successfully.");
    } catch (error) {
        console.error("Error during seeding:", error);
    }
})();