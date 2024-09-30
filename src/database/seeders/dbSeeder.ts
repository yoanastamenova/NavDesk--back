import { bookingSeeder } from "./bookingSeeder";
import { reportSeeder } from "./reportSeeder";
import { bookingHistorySeeder } from "./bookingHistorySeeder";
import { userSeeder } from "./userSeeder";
import { roomSeeder } from "./roomSeeder";

(async () => {
    try {
        console.log("********* Starting seeders... *********");
        console.log("Running User...");
        await userSeeder();
        console.log("User completed.");

        console.log("Running Rooms...");
        await roomSeeder();
        console.log("Rooms completed.");

        console.log("Running Bookings...");
        await bookingSeeder();
        console.log("Bookings completed.");

        console.log("Running History...");
        await bookingHistorySeeder();
        console.log("accessHistorySeeder completed.");

        console.log("Running Reports...");
        await reportSeeder();
        console.log("Reports completed.");

        console.log("********* All seeders executed successfully *********")
    } catch (error) {
        console.error("Error during seeding:", error);
    }
})();