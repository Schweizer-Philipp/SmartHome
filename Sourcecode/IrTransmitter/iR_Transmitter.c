#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../ir-slinger-master/irslinger.h"

int main(int argc, char *argv[]) {
    
    if(argc != 6) {

	    return 1;
    }

    uint32_t outPin = atoi(argv[1]);               //The Broadcom pin number the signal will be sent on 24
    int frequency = atoi(argv[2]);             // The frequency of the IR signal in Hz
    float dutyCycle = atof(argv[3]);         // The duty cycle of the IR signal. 0.5 means for every cycle, // the LED will turn on for half the cycle time, and off the other half


    int *iRCode = (int *) malloc(atoi(argv[4]) * sizeof(int));

    char *number = strtok(argv[5],",");

    int counter = 0;
    
    while(number != NULL)  {

	*(iRCode + counter) = atoi(number);

	number = strtok(NULL,",");
	
	counter++;
    }

    int result = irSlingRaw(outPin, frequency, dutyCycle, iRCode,atoi(argv[4]));

    return result;
}
