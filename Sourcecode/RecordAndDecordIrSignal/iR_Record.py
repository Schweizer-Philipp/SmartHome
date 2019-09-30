import RPi.GPIO as GPIO
from datetime import datetime

iRInputSignal = 1  #1 = no input

def record_ir_signals(irSignal, inputPort):

    global iRInputSignal

    while iRInputSignal == 1:
        iRInputSignal = GPIO.input(inputPort)

    startTime = datetime.now()

    amountOfOnesRecorded = 0

    prevIRInputSignal = 0

    while True:

        if iRInputSignal != prevIRInputSignal:
            now = datetime.now()
            pulseLength = now - startTime
            startTime = now

            irSignal.append(pulseLength.microseconds)

        if iRInputSignal == 1:
            amountOfOnesRecorded = amountOfOnesRecorded + 1
        else:
            amountOfOnesRecorded = 0

        if amountOfOnesRecorded > 10000:
            break

        prevIRInputSignal = iRInputSignal
        iRInputSignal = GPIO.input(inputPort)