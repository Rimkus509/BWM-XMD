const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkZuZWFiWDFBZnFwSWR0ZU5nSW1ENldXMUpZb3RuTHZSeDJ6VVNvR1FuTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWhTaDFlVUpSQ052R1djbUJYZnloS3VRekJaUmRUbDhXT0UwOGdEc09sVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQU9hcFlaVUpiTWNNbElJRE5UNHQ4T29sR3pGZVpBd21DMy9xU3g5bmxJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3VXFXOTFlMVNRai9nTnJpZTBIaXU3UFJiU25oVWJoYm9yek53eG9pYlU0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFYWZZRXZKZEwvR2xGWm50eHRnR2tWYzZvNU5RclM3RjJkcGcrQ2wxRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVnM3FZVlppNkUvUXdvZU0zUHlMS25yK3ZLOXZMWmRxZDVkM1c4ZUZIeVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUYyWnNhdEhCdW9wc0UwbEd2RktodGJGOHltd1hUNFVIdmo5L1FSY3hWMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZno2Q2RPZTdOMWFLRXc5OHMwOU1aRGtvV0JKWlNMcUltelZES1NSczdGZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQ4clZpbHlLYUphdUhxaENFb3orbitQN1FuUVlreWpTeUN5VzJOOEVkZzZUQmxGMkg0QXBQYmlKNWlNaGgycFVwZFp3ZXlERTV4R2VkbUQzbWFFRGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJPOXZPeEhWMXRmOHMwMUsxdjJCRmZjTlNXTjBXVFhTdm43OFFOUm5yNTh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTM4NjQ0NDU5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBMTJGOTgyNjIyODkyNzI2RjAzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ4MTY1NDB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkMtbHlOZVhRUnBhcE9OVndIWXRvNWciLCJwaG9uZUlkIjoiYTA0ZTYxNjUtZWRhZC00YzkzLThmN2YtMjdhNGY5YjM3NzY0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5ha3ZjWERUb3FLZWY3dHVqTFhSdjV3VC9HTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKdEFNeDRMOXIxMlh1UHltUGZBbDludEdlM2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVERDMkdWQloiLCJtZSI6eyJpZCI6IjUwOTM4NjQ0NDU5OjY0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuOAmPCdkJPwnZCM8J2Qj+OAmfCdkJHwnZCI8J2QjPCdkIrwnZCU8J2QkiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT0hmb3Q4UEVJdTV1cllHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia1VObzl2dWZ2UG83TGdzWmpjTkFyN2JiRmxxTDBhLzRKTm5CSm5ub293Zz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibHlNTXRJdW9tL2lQUXNWRjQ0Ly9xa2EvemVoeWhlVjF0RHE4VnpCR1hLejBrMnpRNHpQSjg2emphcnpPZEhWaUJrTkZlUUsvcm8remRmeTZ3ZGF3RHc9PSIsImRldmljZVNpZ25hdHVyZSI6Im5KQ25YaWE1NjkwcEdXZE1Wam9Wak04MTBZOVZRK2YxNU1VcWlaNXBJUG5ZMU1UMng5eHZyRzk2Mk83Uy9ZcmZlc1I4VzcwMjQ1Q0FuR09KMTVaQWl3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTA5Mzg2NDQ0NTk6NjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkZEYVBiN243ejZPeTRMR1kzRFFLKzIyeFphaTlHditDVFp3U1o1NktNSSJ9fV0sInBsYXRmb3JtIjoic21iaSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDgxNjUzNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNMTIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "RIMKUS",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "‪50938644459‬",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});


