const moment = require('moment');
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    let current_time = moment().utc();
    console.log(current_time.format('YYYY-MM-DD HH:mm:ss'), "current_time");

    let doc_app_time = moment.unix(1722606480).utc(); // keep in utc format
    console.log(doc_app_time.format('YYYY-MM-DD HH:mm:ss'), "doc_app_time");

    // Compare the times to the second
    if (current_time.isSame(doc_app_time, 'second')) {
        console.log("It's the exact time to deal with the doctor");
    }

    let interval = Math.floor(current_time.diff(doc_app_time) / 60000); // Get interval in minutes
    console.log(interval, "interval");

    if (interval === -1) {
        console.log("It's alert before 1 minute");
    } else if (interval === 1) {
        console.log("It's alert after 1 minute");
    } else if (interval === 2) {
        console.log("It's alert after 2 minutes");
    }
});
