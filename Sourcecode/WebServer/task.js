var CronJob = require('cron').CronJob;
const hash = require('object-hash');

module.exports = class Task
{
	constructor(cronTime, customName, periode, daysOfExecution, callback, source, button)
	{
		this.cronTime = cronTime;
		this.customName = customName;
		this.periode = periode;
		this.callback = callback;
		this.countFunctioncalls = 0;
		this.daysOfExecution = daysOfExecution;
		this.source = source;
		this.button = button;
		this.border = daysOfExecution * this.periode;
		this.cronJob = new CronJob(this.cronTime, function(){

			this.cronJobFunction();
		}.bind(this));
		this.ID = hash(this);
		this.cronJob.start();
	}

	cronJobFunction()
	{
		this.countFunctioncalls++;
		
		if(this.countFunctioncalls>this.daysOfExecution && this.countFunctioncalls<= this.border)
		{
			if(this.border == this.countFunctioncalls)
				this.countFunctioncalls = 0;
		}
		else
		{
			this.callback(this.source, this.button);
		}
		
	}
	
	getID()
	{
		return this.ID;
	}

	getNextExecutionDay()
	{
		var tempCountFunctioncalls = this.countFunctioncalls + 1; // +1 simuliert den ersten call von Cronjob
		var datePosition = 0;
		while(tempCountFunctioncalls>this.daysOfExecution && tempCountFunctioncalls<= this.border)
		{
			if(this.border == tempCountFunctioncalls)
			{
				datePosition++;
				break;
			}
			tempCountFunctioncalls++;
			datePosition++;
		}

		return this.cronJob.nextDates(datePosition+1)[datePosition].format();
	}
	
	equals(cronTime, periode, daysOfExecution, source, button)
	{
		if(this.cronTime == cronTime && this.periode == periode && this.daysOfExecution == daysOfExecution && this.source == source && this.button == button)
			return true;
			
		return false;
	}

	toJSON()
	{
		return JSON.stringify({cronTime: this.cronTime, customName: this.customName, periode: this.periode, daysOfExecution: this.daysOfExecution, source: this.source, button: this.button, ID: this.ID, nextExecutionDay: this.getNextExecutionDay()});
	}
}
