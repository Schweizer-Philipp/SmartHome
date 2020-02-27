var task = require('./task');
const fs = require('fs');

module.exports = class TaskManager
{
	
	constructor()
	{
		this.taskList = [];
	}
	
	addNewTask(data, callback)
	{
		var cronTime = data["cronTime"];
		
	
		if(Number(cronTime["min"]) > 59 || Number(cronTime["min"]) < 0)
			return "Error: CronTime min is wrong: "+cronTime["min"];
		
		if(Number(cronTime["std"]) > 23 || Number(cronTime["std"]) < 0)
			return "Error: CronTime std is wrong: "+cronTime["min"];
			
		if(!(cronTime["dayOfTheMonth"] === "*" ^ cronTime["weekdays"] === "*"))
			return "Error: CronTime dayOfTheMonth and weekdays are both * or both are not *";
			
		if(Number(cronTime["month"]) > 12 || Number(cronTime["month"]) < 1 || cronTime["month"] !== "*")
			return "Error: CronTime month is wrong: "+cronTime["month"];
			
		if(Number(data["periode"]) < 1)
			return "Error: Periode is wrong: "+data["periode"];
		
		var cronTimeAsString = Object.values(cronTime).join(" ");
		
		var daysOfExecution;
		
		if(cronTime["dayOfTheMonth"] === "*")
		{
			daysOfExecution = cronTime["weekdays"].split(",").length;
		}
		else
		{
			daysOfExecution = cronTime["dayOfTheMonth"].split(",").length;
		}
		
		var tmptask = this.taskList.find(t => t.equals(cronTimeAsString, data["periode"], daysOfExecution, data["source"], data["button"]));
		
		if(tmptask !== undefined)
			return "Error: Task gibt es schon";
		
		
		var specTask = new task(cronTimeAsString, data["periode"], daysOfExecution, callback, data["source"], data["button"]);
		
		this.taskList.push(specTask);
		
		this.updateTaskFile();

		return specTask.getID();
	}
	
	deleteTask(ID)
	{
		var task = this.taskList.find(t => t.getID() === ID);
		
		if(task === undefined)
			return "Error: Task mit ID: "+ID+" gibt es nicht";
			
		var index = this.taskList.indexOf(task);
		
		this.taskList.splice(index, 1);
		
		this.updateTaskFile();

		return "Task erfolgreich gelöscht";
	}

	updateTaskFile()
	{
		fs.writeFileSync("task_administration_config.txt",JSON.stringify(this));
	}

	recoveryTasksFromFile(callback)
	{
		var data = fs.readFileSync("task_administration_config.txt", "utf8");
		console.log(JSON.parse(data));
		var rawData = JSON.parse(data)["taskList"];

		console.log(rawData[0]["cronTime"]);

		for(var i = 0; i< rawData.length;i++)
		{
			//console.log(rawData[0]["cronTime"]);
			var specTask = new task(rawData["cronTime"], rawData["periode"], rawData["daysOfExecution"], callback, rawData["source"], rawData["button"]);
		
			this.taskList.push(specTask);
		}
	}
}
