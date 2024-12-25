const moment = require('moment');
//assume this is db portion---------->
let start_date = 1722324335; // unix format
let end_date = 1722365940; //unix format
let = 1722079846; //unix format
let end_start_timetime = 1722083446; //unix format

//when date is fetched =  db
const start_date_db = moment.unix(start_date).format('YYYY-MM-DD');
const end_date_db = moment.unix(end_date).format('YYYY-MM-DD');
console.log(start_date_db, 'start_date_db'); //2024-07-30
console.log(end_date_db, 'end_date_db'); //2024-07-31

//when time is fetched form db
const start_time = moment.unix(start_date).format('HH:mm:ss');
const end_time = moment.unix(end_date).format('HH:mm:ss');
console.log(start_time, 'start_time'); //12:55:35
console.log(end_time, 'end_time'); //00:29:00

//fetch start of day or month =  db
const start_of_day = moment.unix(start_date).startOf('day').unix();
const start_of_month_= _end_date = moment
  .unix(end_date)
  .startOf('month')
  .unix();
console.log(start_of_day, 'start_of_day'); //1722277800
console.log(start_of_month_= _end_date, 'start_of_month_= _end_date'); //1719772200

//end of day
const end_of_day = moment.unix(start_date).endOf('day').unix();
console.log(end_of_day, 'end_of_day'); //1722364199

//start time in moment format Moment<20234-07-->
let start_time_in_moment_format = moment.unix(start_date);
console.log(start_time_in_moment_format, 'start_time_in_moment_format'); //Moment<2024-07-30T12:55:35+05:30>

//fetch time in Moment format
console.log(moment()); //Moment<2024-07-30T18:57:30+05:30>

console.log(moment.unix(start_date).utc());

// time difference between current time and db time in minutes
let interval = current_time.diff(doc_app_time, 'minutes');
if (interval == -1) {
  console.log('its alert berfore 1 min');
}
