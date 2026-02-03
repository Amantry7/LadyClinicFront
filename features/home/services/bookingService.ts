
// services/bookingService.ts
import { BookingFormData } from '../types';

export class BookingService {
    static async submitBooking(values: BookingFormData): Promise<boolean> {
        try {
            // Здесь будет логика отправки данных на сервер
            console.log('Booking form values:', values);

            // Симуляция API вызова
            await new Promise(resolve => setTimeout(resolve, 1000));

            return true;
        } catch (error) {
            console.error('Booking submission error:', error);
            return false;
        }
    }

    static validatePhone(phone: string): boolean {
        const phoneRegex = /^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/;
        return phoneRegex.test(phone);
    }

    static formatPhone(phone: string): string {
        // Форматирование телефона для Кыргызстана
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('996')) {
            return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
        }
        return phone;
    }
}
