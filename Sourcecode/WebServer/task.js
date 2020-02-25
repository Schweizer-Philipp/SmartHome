var CronJob = require('cron').CronJob;
const hash = require('object-hash');

module.exports = class Task
{
	constructor(cronTime, periode, daysOfExecution, callback, source, button)
	{
		this.cronTime = cronTime;
		this.periode = periode;
		this.callback = callback;
		this.countFunctioncalls = 0;
		this.daysOfExecution = daysOfExecution;
		this.source = source;
		this.button = button;
		this.border = daysOfExecution * this.periode;
		this.cronJob = new CronJob(this.cronTime,callback);
		this.ID = hash(this);
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
}
