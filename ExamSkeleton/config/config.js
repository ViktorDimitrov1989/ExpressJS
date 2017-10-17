module.exports = {
    development: {
        //set global variables
        port: process.env.PORT || 3000,
        dbPath: 'mongodb://localhost:27017/exam-skeleton-db'
    },
    production: {}
}
