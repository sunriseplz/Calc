const cron = require('node-cron');

cron.schedule('* * 23  * * * ', function() {
    console.log('running a task every minute');
});