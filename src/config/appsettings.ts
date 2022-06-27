

const appsettings = {
    appconfig: {
        NAME: 'OrderApp',
    },
    authentication:{
        minPasswordLength: 6,
        secrete_key: "secreteKey_from_env_file",
        tokenExpireDuration: 900
    }
}

export default appsettings;