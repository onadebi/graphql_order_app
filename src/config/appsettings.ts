import dotenv from 'dotenv';
dotenv.config();

const appsettings = {
    appconfig: {
        NAME: 'OrderApp',
        PORT: Number(process.env.PORT) || 4500,
        ENV: process.env.NODE_ENV
    },
    authentication:{
        minPasswordLength: 6,
        secrete_key: "secreteKey_from_env_file",
        tokenExpireDuration: 900
    }
}

export default appsettings;