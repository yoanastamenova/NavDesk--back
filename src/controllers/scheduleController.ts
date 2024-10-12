import cron from 'node-cron';
import { Booking } from '../database/models/Booking';
import { Booking_History } from '../database/models/Booking_history';
import { LessThanOrEqual, Not } from 'typeorm'; // Add this import

export const moveExpiredReservationsToHistory = async () => {
    const currentDate = new Date();

    const expiredReservations = await Booking.find({
        where: {
            exit_datetime: LessThanOrEqual(currentDate),
            state: Not("Checked-out" as "Reserved" | "Checked-in" | "Checked-out" | "Cancelled")
        }
    });

    const validStates = ["reserved", "cancelled", "no-show", "completed"];

    const historyPromises = expiredReservations.map(reservation => {
        const history = new Booking_History();
        history.room_id = reservation.room_id;
        history.user_id = reservation.user_id;
        history.entry_datetime = reservation.entry_datetime;
        history.exit_datetime = reservation.exit_datetime || new Date(); 
        return history.save();
    });

    // Save all histories
    await Promise.all(historyPromises);

    const deletePromises = expiredReservations.map(reservation => {
        return Booking.delete({ id: reservation.id });
    });

    await Promise.all(deletePromises);
    
    console.log("Moved expired reservations to history.");
}

// Schedule the task to run at midnight every day
cron.schedule('0 0 * * *', async () => {
    console.log("Running scheduled task to move expired reservations.");
    await moveExpiredReservationsToHistory();
});