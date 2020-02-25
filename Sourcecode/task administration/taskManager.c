#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <time.h>
#include <limits.h>
#include <linux/inotify.h>

#define EVENT_SIZE  ( sizeof (struct inotify_event) )
#define EVENT_BUF_LEN     ( 1024 * ( EVENT_SIZE + 16 ) )
#define TRUE 1
#define FALSE 0

typedef struct
{
    int ID;
    struct tm* execution_time;
    struct tm* orientation_time;
    int* weekdays;
    int* calendardays;
    int executionDaysLen;
    int periode; // given in weeks
    int weekdaysTask;
} task;

typedef struct
{
    task* tasks;
    int len;
} taskArray;

taskArray* initTasks(char* path, char* fileName);
int countRows(path, fileName);

void parseID(char* data, task* specTask);
void parseSeconds(char* data, task* specTask);
void parseMinutes(char* data, task* specTask);
void parseHours(char* data, task* specTask);
void parseDayOfTheMonth(char* data, task* specTask);
void parseMonth(char* data, task* specTask);
void parseYear(char* data, task* specTask);
void parseWeekdaysTask(char* data, task* specTask);
void parseDaysOfExecution(char* data, task* specTask);
void parsePeriode(char* data, task* specTask);

void printTasks(taskArray* tasks);


int main(int argc, char* argv[])
{
    char* pathToTaskfile = "/home/philipp/Dokumente/SmartHome/Sourcecode/WebServer";
    char* taskfileName = "task_administration_config.txt";
    taskArray* tasks = initTasks(pathToTaskfile, taskfileName);
    //printTasks(tasks);
    //watchFile("/home/philipp/Schreibtisch", routine);
    //close();
    calculateExecutionTimes(tasks);
    return 0;
}


int watch;
int fd;
int wd;

taskArray* initTasks(char* path, char* fileName)
{
    int len = countRows(path, fileName);
    taskArray* taskA = (taskArray*) malloc(sizeof(taskArray));
    task* tasks = (task*) malloc(sizeof(task) * len);
    char* filePath = malloc(strlen(path) + strlen(fileName) + 2);
    strcpy(filePath, path);
    strcat(filePath, "/");
    strcat(filePath, fileName);
    FILE* file = fopen(filePath, "r");
    char line[512];
    int count = 0;

    while(fgets(line, sizeof(line), file))
    {
        parseLineToTask(line, (tasks + count));
        count++;
    }

    fclose(file);
    free(filePath);
    taskA->len = len;
    taskA->tasks = tasks;
    return taskA;
}

void parseLineToTask(char* line, task* specTask)
{
    void (*parseFunctions[10])(char*, task*) = {&parseID, &parseSeconds, &parseMinutes, &parseHours, &parseDayOfTheMonth, &parseMonth, &parseYear, &parseWeekdaysTask, &parseDaysOfExecution, &parsePeriode};
    struct tm* orientation_time = (struct tm*) malloc(sizeof(struct tm));
    specTask->orientation_time = orientation_time;
    char delimiter[2] = ";";
    char* token;
    int counter = 0;
    token = strtok(line, delimiter);

    while(token != NULL)
    {
        parseFunctions[counter](token, specTask);
        token = strtok(NULL, delimiter);
        counter++;
    }
}
int countRows(path, fileName)
{
    char* filePath = malloc(strlen(path) + strlen(fileName) + 2);
    strcpy(filePath, path);
    strcat(filePath, "/");
    strcat(filePath, fileName);
    FILE* file = fopen(filePath, "r");
    char line[512];
    int count = 0;

    while(fgets(line, sizeof(line), file))
    {
        count++;
    }

    fclose(file);
    free(filePath);
    return count;
}
int watchFile(char* directory, void* (*routine)(void*))
{
    int length, i = 0;
    watch = TRUE;
    char buffer[EVENT_BUF_LEN];
    fd = inotify_init();

    if(fd < 0)
    {
        perror("inotify_init");
        return -1;
    }

    wd = inotify_add_watch(fd, directory, IN_MODIFY);

    while(watch)
    {
        length = read(fd, buffer, EVENT_BUF_LEN);

        if(length < 0)
        {
            perror("read");
            return -1;
        }

        while(i < length)
        {
            struct inotify_event* event = (struct inotify_event*) &buffer[ i ];

            if(event->len)
            {
                if(event->mask & IN_MODIFY)
                {
                    if(!(event->mask & IN_ISDIR))
                    {
                        (*routine)(event->name);
                    }
                }
            }

            i += EVENT_SIZE + event->len;
        }
    }

    return 0;
}
void close()
{
    inotify_rm_watch(fd, wd);
    close(fd);
}

void calculateExecutionTimes(taskArray* tasks)
{
    for(int i = 0; i < tasks->len; i++)
    {
        task specTask = *(tasks->tasks + i);

		

        if(specTask.weekdaysTask == TRUE)
        {
            time_t time = mktime(specTask.orientation_time);
            int orientation_time = localtime(&time)->tm_wday;
            int distance = findLowestDistance(specTask.weekdays,specTask.executionDaysLen,orientation_time,7);
            struct tm* exe = (struct tm*) malloc(sizeof(struct tm));
            
        }

        else
        {
			
        }
    }
}

void parseID(char* data, task* specTask)
{
    specTask->ID = atoi(data);
}
void parseSeconds(char* data, task* specTask)
{
    specTask->orientation_time->tm_sec = atoi(data);
}
void parseMinutes(char* data, task* specTask)
{
    specTask->orientation_time->tm_min = atoi(data);
}
void parseHours(char* data, task* specTask)
{
    specTask->orientation_time->tm_hour = atoi(data);
}
void parseDayOfTheMonth(char* data, task* specTask)
{
    specTask->orientation_time->tm_mday = atoi(data);
}
void parseMonth(char* data, task* specTask)
{
    specTask->orientation_time->tm_mon = atoi(data);
}
void parseYear(char* data, task* specTask)
{
    specTask->orientation_time->tm_year = atoi(data) - 1900;
}
void parseWeekdaysTask(char* data, task* specTask)
{
    if(strcmp(data, "TRUE") == 0)
    {
        specTask->weekdaysTask = TRUE;
    }

    else
    {
        specTask->weekdaysTask = FALSE;
    }
}
void parseDaysOfExecution(char* data, task* specTask)
{
    int len = strlen(data);
    len = len - (int)(len / 2);
    int* days = (int*) malloc(sizeof(int) * len);
    char delimiter[2] = ",";
    char* token;
    int counter = 0;
    char* saveptr = NULL;
    token = strtok_r(data, delimiter, &saveptr);

    while(token != NULL)
    {
        *(days + counter) = atoi(token);
        token = strtok_r(NULL, delimiter, &saveptr);
        counter++;
    }

    specTask->executionDaysLen = len;

    if(specTask->weekdaysTask == TRUE)
    {
        specTask->weekdays = days;
    }

    else
    {
        specTask->calendardays = days;
    }
}
void parsePeriode(char* data, task* specTask)
{
    specTask->periode = atoi(data);
}
void printTasks(taskArray* tasks)
{
    for(int i = 0; i < tasks->len; i++)
    {
        task specTask = *(tasks->tasks + i);
        printf("ID: %i\n", specTask.ID);
        printf("SEC: %i\n", specTask.orientation_time->tm_sec);
        printf("MIN: %i\n", specTask.orientation_time->tm_min);
        printf("HOUR: %i\n", specTask.orientation_time->tm_hour);
        printf("DayOfMonth: %i\n", specTask.orientation_time->tm_mday);
        printf("Month: %i\n", specTask.orientation_time->tm_mon);
        printf("Year: %i\n", specTask.orientation_time->tm_year);
        printf("Periode: %i\n", specTask.periode);
        printf("Weekdays?: %s\n", (specTask.weekdaysTask == TRUE ? "TRUE" : "FALSE"));
        printf("Days of execution: ");
        int* days = (specTask.weekdaysTask == TRUE) ? specTask.weekdays : specTask.calendardays;

        for(int i = 0; i < specTask.executionDaysLen; i++)
        {
            printf("%i,", *(days + i));
        }

        printf("\n");
    }
}
int findLowestDistance(int* days, int size, int currentDay, int border)
{
    int distance= INT_MAX;
    int i;

    for(i = 0; i < size; i++)
    {
		int tempDistance = (border - current + *(days+i)) % border;
        
		if(tempDistance < distance)
		{
			distance = tempDistance;
		}
    }

    return distance;
}


