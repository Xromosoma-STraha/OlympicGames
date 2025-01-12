import { connectToDatabase, disconnectFromDatabase } from '~/server/utils/db';
import type { Athlete } from '~/types/athlete';

export default defineEventHandler(async (event): Promise<Athlete[]> => {
    const athleteName = event.context.params?.name ?? ''; // Используем optional chaining и nullish coalescing
    let client;
    try {
        client = await connectToDatabase();
        const query = `
            SELECT
                s.Фамилия, s.Имя, oi.Год_проведения, so.Название_соревнования, u.Место, r.Результат
            FROM Спортсмен s
            LEFT JOIN Участие u ON s.id_Спортсмена = u.id_Спортсмена
            LEFT JOIN Соревнование so ON u.id_Соревнования = so.id_Соревнования
            LEFT JOIN Мероприятие m ON so.id_Мероприятия = m.id_Мероприятия
            LEFT JOIN Олимпийские_Игры oi ON m.id_Олимпийских_Игр = oi.id_Олимпийских_Игр
            LEFT JOIN Рекорд r ON s.id_Спортсмена = r.id_Спортсмена AND so.id_Соревнования = r.id_Соревнования
            WHERE s.Фамилия || ' ' || s.Имя ILIKE $1;
        `;
        const values = [`%${athleteName}%`];

        const result = await client.query(query, values);
        return result.rows as Athlete[];
    } catch (error) {
        console.error('Database error:', error);
        throw createError({ statusCode: 500, statusMessage: 'Database error' });
    } finally {
        if (client) await disconnectFromDatabase();
    }
});