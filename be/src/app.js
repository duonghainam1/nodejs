import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import sound_clouds from './model/sound_clouds.js';
import path from 'path';
import { fileURLToPath } from 'url';
import Router_sound_clouds from './routers/sound_clouds.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB(process.env.DB_URI);
app.use('/api', Router_sound_clouds);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, './data');



// const filePath = path.join(__dirname, './data/nam.txt');

const reading = async (filePath) => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const lines = fileData.split('\n');

    for (const line of lines) {
        const [id, link, count, track, status, scan, number_of_songs, country, views] = line.split(' | ').map(item => item.trim());
        const existingData = await sound_clouds.findOne({ id });
        // console.log('existingData', existingData);

        if (!existingData) {
            try {
                await sound_clouds.insertMany({ id, link, count, track, status, scan, number_of_songs, country, views });
                console.log('Data imported successfully!');
            } catch (error) {
                console.log('Error importing data:', error.message);
            }
        } else {
            console.log(`Data with id ${id} already exists. Skipping.`);
        }
    }
};

const importData = async () => {
    try {
        const files = fs.readdirSync(directoryPath);
        const txtFiles = files.filter(file => file.endsWith('.txt'));
        for (const file of txtFiles) {
            const filePath = path.join(directoryPath, file);
            await reading(filePath);
        }
    } catch (error) {
        console.log('Error importing data:', error.message);
    }
};

importData();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
// export const viteNodeApp = app;
