(function($) {
	$.fn.maxTimer = function(options, callback) {
		$(this).each(function() {
			var timerBox = $(this),
				timerCounter =$( 
					'<ul class="maxTimerCounter">'+
						'<li><span class="number days">99</span><span class="title days"></span></li>'+
						'<li><span class="number hours">24</span><span class="title hours"></span></li>'+
						'<li><span class="number minutes">59</span><span class="title minutes"></span></li>'+
						'<li><span class="number seconds">59</span><span class="title seconds"></span></li>'+
					'</ul>'),
				timerTitle = $('<div class="maxTimerTitle"></div>'),
				settings = {
					'status': 1,
					'timertype': 'daily',
					'starttitle': '',
					'endtitle': '',
					'startdate': new Date('+1d'),
					'enddate': new Date('+2d'),
					'startshow': new Date('+1d'),
					'endshow': new Date('+2d'),
					'startperiod': 1,
					'endperiod': 7,
					'days' : 'Days',
					'hours' : 'Hours',
					'minutes' : 'Mins',
					'seconds' : 'Secs',
					'date': null,
					'format': 'on'
				},
				data = {
					'status': timerBox.attr('data-status')?parseInt(timerBox.attr('data-status')):'',
					'timertype': timerBox.attr('data-type')?timerBox.attr('data-type'):'',
					'starttitle': timerBox.attr('data-starttitle')?timerBox.attr('data-starttitle'):'',
					'endtitle':  timerBox.attr('data-endtitle')?timerBox.attr('data-endtitle'):'',
					'startdate':  timerBox.attr('data-startdate')?timerBox.attr('data-startdate'):'',
					'enddate': timerBox.attr('data-enddate')?timerBox.attr('data-enddate'):'',
					'startperiod':  timerBox.attr('data-startperiod')?parseInt(timerBox.attr('data-startperiod')):'',
					'startshow':  timerBox.attr('data-startdate')?timerBox.attr('data-startdate'):'',
					'endshow': timerBox.attr('data-enddate')?timerBox.attr('data-enddate'):'',
					'endperiod': timerBox.attr('data-endperiod')?parseInt(timerBox.attr('data-endperiod')):'',
					'days' : timerBox.attr('data-days')?timerBox.attr('data-days'):'',
					'hours' : timerBox.attr('data-hours')?timerBox.attr('data-hours'):'',
					'minutes' : timerBox.attr('data-minutes')?timerBox.attr('data-minutes'):'',
					'seconds' : timerBox.attr('data-seconds')?timerBox.attr('data-seconds'):'',
					'date': null,
					'format': timerBox.attr('data-format')?timerBox.attr('data-format'):'',
				},
				TimerInit = function() {
					var endDate = new Date(settings.enddate),
						title = settings.endtitle?settings.endtitle:settings.starttitle,
						$monthLoc = ["OCAK","ŞUBAT","MART","NİSAN","MAYIS","HAZİRAN","TEMMUZ","AĞUSTOS","EYLÜL","EKİM","KASIM","ARALIK"];
					title = title.replace("{endD}",endDate.getDate()-1).replace("{endM}",$monthLoc[endDate.getMonth()]);
					console.log(title);
					timerCounter.find('.title.days').text(settings.days);
					timerCounter.find('.title.hours').text(settings.hours);
					timerCounter.find('.title.minutes').text(settings.minutes);
					timerCounter.find('.title.seconds').text(settings.seconds);
					timerTitle.text(title);
					timerBox.empty();
					timerBox.addClass('maxTimer');
					timerBox.append(timerTitle);
					timerBox.append(timerCounter);				
				},
				WeeklyRecalculate = function() {
					var $today = new Date(),
						$time = $today.getTime(),
						$weekday = $today.getDay(),
						$daymilisec = 86400000,
						$months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					if(settings.startperiod<settings.endperiod){
						if($weekday>=settings.startperiod && $weekday<=settings.endperiod) {
							var $startdelta = $weekday-settings.startperiod,
								$enddelta = settings.endperiod-$weekday,
								$starttime = $time - $daymilisec*$startdelta,
								$startdateTmp = new Date($starttime),
								$startdateCurr = $months[$startdateTmp.getMonth()]+' '+$startdateTmp.getDate()+' '+$startdateTmp.getFullYear()+' 00:00:00 GMT+0300',
								$endtime = $time + $daymilisec*$enddelta,
								$enddateTmp = new Date($endtime),
								$enddateCurr = $months[$enddateTmp.getMonth()]+' '+$enddateTmp.getDate()+' '+$enddateTmp.getFullYear()+' 00:00:00 GMT+0300';
							settings.startdate = $startdateCurr;
							settings.enddate = $enddateCurr;
							return true;
						}
						return false;
					}
					else {
						if($weekday>=settings.startperiod || $weekday<=settings.endperiod) {
							if($weekday>=settings.startperiod) {
								var $startdelta = $weekday-settings.startperiod,
									$enddelta = 7-$weekday+settings.endperiod;
									
							}
							if($weekday<=settings.endperiod) {
								var $startdelta = 7-settings.startperiod+$weekday,
									$enddelta = settings.endperiod-$weekday;
							}
							var $starttime = $time - $daymilisec*$startdelta,
								$startdateTmp = new Date($starttime),
								$startdateCurr = $months[$startdateTmp.getMonth()]+' '+$startdateTmp.getDate()+' '+$startdateTmp.getFullYear()+' 00:00:00 GMT+0300',
								$endtime = $time + $daymilisec*$enddelta,
								$enddateTmp = new Date($endtime),
								$enddateCurr = $months[$enddateTmp.getMonth()]+' '+$enddateTmp.getDate()+' '+$enddateTmp.getFullYear()+' 00:00:00 GMT+0300';
							settings.startdate = $startdateCurr;
							settings.enddate = $enddateCurr;
							return true;
						}
						return false;
					}
				},
				Countdown = function () {
					currentDate = Math.floor($.now() / 1000),
					eventDate = currentDate<eventStartDate?eventStartDate:(currentDate<eventEndDate?eventEndDate:null);

					if(currentDate > eventDate) {
						timerBox.hide();
						callback.call(this);
					}
					var seconds = eventDate - currentDate,
						days = Math.floor(seconds / (60 * 60 * 24));
					seconds -= days * 60 * 60 * 24;

					var hours = Math.floor(seconds / (60 * 60));
					seconds -= hours * 60 * 60;
					
					var minutes = Math.floor(seconds / 60);
					seconds -= minutes * 60;

					//if(settings['format'] == "on") {
						days = (String(days).length >= 2) ? days : "0" + days;
						hours = (String(hours).length >= 2) ? hours : "0" + hours;
						minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
						seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
					//}
					if(!isNaN(eventDate)) {
						if(timerBox.find(".number.days").text()!=days){
							timerBox.find(".number.days").stop().animate({'opacity':0},250,'linear',function(){
								$(this).text(days).stop().animate({'opacity':1},250,'linear')
							});	
						}
						if(timerBox.find(".number.hours").text()!=hours){
							timerBox.find(".number.hours").stop().animate({'opacity':0},250,'linear',function(){
								$(this).text(hours).stop().animate({'opacity':1},250,'linear')
							});
						}
						if(timerBox.find(".number.minutes").text()!=minutes){
							timerBox.find(".number.minutes").stop().animate({'opacity':0},250,'linear',function(){
								$(this).text(minutes).stop().animate({'opacity':1},250,'linear')
							});	
						}
						timerBox.find(".number.seconds").stop().animate({'opacity':0},250,'linear',function(){
							$(this).text(seconds).stop().animate({'opacity':1},250,'linear')});
					}
					else {
						clearInterval(interval); 
					}
				};
			$.extend(settings, data);
			if(options) {
				$.extend(settings, options);
			}
			if(settings.status){
				var recalculate = true;
				if(settings.timertype=='weekly') {
					recalculate = WeeklyRecalculate();
				}
				if(recalculate) {
					var eventStartDate = Date.parse(settings.startdate) / 1000,
						eventStartShowDate = Date.parse(settings.startshow) / 1000,
						eventEndDate = Date.parse(settings.enddate) / 1000,
						eventEndShowDate = Date.parse(settings.endshow) / 1000,
						today = Math.floor($.now() / 1000);
					if(today < eventEndDate && today > eventStartDate && today < eventEndShowDate && today > eventStartShowDate){
						TimerInit();
						Countdown();
						timerBox.show();
						interval = setInterval(Countdown, 1000);
					}
					else {
						timerBox.empty();
						timerBox.hide();
					}
				}
			}
		});
	}
}) (jQuery);