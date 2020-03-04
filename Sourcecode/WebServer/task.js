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
		this.cronJob = new CronJob(this.cronTime,this.cronJobFunction);
		this.ID = hash(this);
		console.log(cronJob.nextDates());
		//cronJob.start();
	}
	
	cronJobFunction()
	{
		countFunctioncalls++;
		
		if(countFunctioncalls>daysOfExecution && countFunctioncalls<= border)
		{
			if(border == countFunctioncalls)
				countFunctioncalls = 0;
		}
		else
		{
			callback(source, button);
		}
		
	}
	
	getID()
	{
		return this.ID;
	}
	
	equals(cronTime, periode, daysOfExecution, source, button)
	{
		if(this.cronTime == cronTime && this.periode == periode && this.daysOfExecution == daysOfExecution && this.source == source && this.button == button)
			return true;
			
		return false;
	}

	toJSON = function()
	{
		return JSON.stringify({cronTime: this.cronTime, customName: this.customName, periode: this.periode, daysOfExecution: this.daysOfExecution, source: this.source, button: this.button, ID: this.ID});
	};
}
