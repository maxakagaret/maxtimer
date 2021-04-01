# maxtimer
Simple time counter
## Using:
1. Add maxtimer.min.css to the head before main styles. Styles has no dependency. (ex. <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/maxakagaret/maxtimer@1.0/maxtimer.min.css">)
2. Scripts requires jquery library. Add maxtimer.min.js to the end of <body> tag after jquery scripts before the main scripts. (ex. `<script src="https://cdn.jsdelivr.net/gh/maxakagaret/maxtimer@1.0/maxtimer.min.js"></script>`).
3. Add to the your html <div> tag with id "maxTimer" or anything else, what you will use to initiate scripts (ex. <div id="maxTimer"></div>)
4. Init the timer with js code `$(document).ready(function(){$('your-div-identificator').maxTimer();});`

#3 Options:
All options are duplicated with "data-" attribute.
1. status (data-status): number, 0/1 (default: 1) - status of the timer. If you want to switch off timer you can use this option
2. timertype (data-timertype): string, "daily"/"weekly" (default: "daily")- type of timer. "daily" is for time period from start date to end date. Ex. if you set start date as 14 Mart, and end date 14 April, it will work for 1 month without stop. "weekly" is for periodic display of timer. Ex. if you set start date as 14 Mart, end date 14 April, start day of week 1 and start day of week 4, it will work for 1 month only at Mondays, Tuesdays and Wednesdays.
3. starttitle (data-starttitle): string (default: "") - title for timer head block. Can be formated with {endD} for day, when timer ends, and {endM} for month, when timer ends.
4. endtitle (data-endtitle): string (default: "") - same as starttitle, but have higher priority.
5. startdate (data-startdate): string, format ex. "Dec 09 2020 00:00:00 GMT+0300" (default: current date +1 day) - date when timer will starts, need to be more or less, then current date.
6. enddate (data-enddate): string, format ex. "Dec 09 2020 00:00:00 GMT+0300" (default: current date +2 day) - date when timer will stops, need to be more, then current date.
7. startperiod (data-startperiod): number, 1-7 (default: 1) - option works only if timertype is "weekly", day of week, when timer starts. Need to be more then endperiod if showtime inside week (ex. from Tuesday to Friday), or less then endperiod if showtime across weeks (ex. from Friday to Tuesday)
8. endperiod (data-endperiod): number, 1-7 (default: 7) - option works only if timertype is "weekly", day of week, when timer stops.
9. days (data-days): string (default: "Days") - option for localisation. Change it if you use another language, then English.
10. hours (data-hours): string (default: "Hours") - option for localisation. Change it if you use another language, then English.
11. minutes (data-minutes): string (default: "Mins") - option for localisation. Change it if you use another language, then English.
12. seconds (data-seconds): string (default: "Secs") - option for localisation. Change it if you use another language, then English.

## Expample:

```<div
	data-status="1"
	data-type="weekly"
	data-startperiod="3"
	data-endperiod="2"
	data-startdate="Dec 09 2020 00:00:00 GMT+0300"
	data-enddate="Feb 16 2021 00:00:00 GMT+0300"
	data-starttitle="UNTIL THE TIMER STOPS:"
	data-endtitle="UNTIL THE TIMER STOPS:"
	data-days="Day(s)"
	data-minutes="Minute(s)"
	data-hours="Hour(s)"
	data-seconds="Second(s)"
	id="maxTimer"
>
&nbsp;
</div>```
