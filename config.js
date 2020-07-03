const Config = {
    IS_PRODUCTION: process.env.NODE_ENV === 'production' ? true : false,
    IS_DEVELOPMENT: process.env.NODE_ENV !== 'production' ? true : false,
    DATABASE_URL: process.env.DATABASE_URL || 'sqlite::memory:',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin',
    SESSION_SECRET: process.env.SESSION_SECRET || 'tacocat'
}

class DataResponse {
    constructor(success, data, message, error) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.error = error;
    }
}

module.exports = {...Config, DataResponse};