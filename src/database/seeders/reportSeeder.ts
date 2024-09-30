import { AppDataSource } from "../db";
import { Report } from "../models/Report";

export const reportSeeder = async () => {
    try {
        await AppDataSource.initialize();

        const report1 = new Report();
        report1.report_date = new Date("2023-01-01");
        report1.total_entries = 120;
        report1.total_absences = 10;
        report1.frequent_users = '1,2,5'; // Changed to string
        report1.infrequent_users = '3,4'; // Changed to string
        await report1.save();

        const report2 = new Report();
        report2.report_date = new Date("2023-02-01");
        report2.total_entries = 150;
        report2.total_absences = 12;
        report2.frequent_users = '1', '3', '6', '7';
        report2.infrequent_users = '2', '8';
        await report2.save();

        const report3 = new Report();
        report3.report_date = new Date("2023-03-01");
        report3.total_entries = 200;
        report3.total_absences = 5;
        report3.frequent_users = '2', '3', '4', '7';
        report3.infrequent_users = '1', '6';
        await report3.save();

        const report4 = new Report();
        report4.report_date = new Date("2023-04-01");
        report4.total_entries = 180;
        report4.total_absences = 9;
        report4.frequent_users = '4', '5', '7', '8';
        report4.infrequent_users = '1', '2', '3';
        await report4.save();

        const report5 = new Report();
        report5.report_date = new Date("2023-05-01");
        report5.total_entries = 130;
        report5.total_absences = 8;
        report5.frequent_users = '1', '2', '3', '6';
        report5.infrequent_users = '4', '7', '8';
        await report5.save();

        console.log("===========================");
        console.log("Report seeder executed successfully");
        console.log("===========================");

    } catch (error: any) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("----------------------");
        console.error('Error in report seeder execution:', message);
        console.error("----------------------");

    } finally {
        await AppDataSource.destroy();
    }
}