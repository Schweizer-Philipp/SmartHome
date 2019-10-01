#include <stdio.h>
#include "../../Libs/ir-slinger-master/irslinger.h"

int main(int argc, char *argv[])
{
	
	if(argc != 12) {

	    return 1;
    }
	
	uint32_t outPin = atoi(argv[1]);               //The Broadcom pin number the signal will be sent on 24
    int frequency = atoi(argv[2]);             // The frequency of the IR signal in Hz
    float dutyCycle = atof(argv[3]);          // The duty cycle of the IR signal. 0.5 means for every cycle,
	                                 // the LED will turn on for half the cycle time, and off the other half
	int leadingPulseDuration = atoi(argv[4]); // The duration of the beginning pulse in microseconds
	int leadingGapDuration = atoi(argv[5);   // The duration of the gap in microseconds after the leading pulse
	int onePulse = atoi(argv[6]);              // The duration of a pulse in microseconds when sending a logical 1
	int zeroPulse = atoi(argv[7]);             // The duration of a pulse in microseconds when sending a logical 0
	int oneGap = atoi(argv[8]);               // The duration of the gap in microseconds when sending a logical 1
	int zeroGap = atoi(argv[9]);               // The duration of the gap in microseconds when sending a logical 0
	int sendTrailingPulse = atoi(argv[10]);       // 1 = Send a trailing pulse with duration equal to "onePulse"
	                                 // 0 = Don't send a trailing pulse

	int result = irSling(
		outPin,
		frequency,
		dutyCycle,
		leadingPulseDuration,
		leadingGapDuration,
		onePulse,
		zeroPulse,
		oneGap,
		zeroGap,
		sendTrailingPulse,
		argv[11]);
	
	return result;
}
