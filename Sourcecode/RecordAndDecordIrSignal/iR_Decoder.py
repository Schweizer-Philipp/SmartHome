import math
import os
from datetime import datetime
from time import sleep
from typing import List, Any

from datetime import datetime

import RPi.GPIO as GPIO

from subprocess import call

from iR_Record import record_ir_signals
from iR_Signal_Smoother import smooth_IR_Signal

irSignal = []
irSignalSmoothed = []
INPUT_WIRE = 16

GPIO.setmode(GPIO.BOARD)
GPIO.setup(INPUT_WIRE, GPIO.IN)

fileName = input("Wie soll Ihre config Datei heißen?:\t")
remoteControlName = input("Wie heißt Ihre Fernbedienung?:\t")

while True:

    buttonName = input("Wie heißt der Button?:\t")

    print("Drücken Sie jetzt den Knopf auf der Fernbedienung!")

    record_ir_signals(irSignal, INPUT_WIRE)
    
    print("Ursignal:")
    print(irSignal)
    
    print("länge: "+str(len(irSignal)))
    
    counter = 1;
    
    while True:

        
        print("Wir werden nun das Signal glätten und testen.Halten Sie die Infrarot LED an den Empfänger des Gerätes.")
        
        smooth_IR_Signal(irSignal, irSignalSmoothed, counter)
        
        irCodeStringArraySmoothed = ','.join(map(str, irSignalSmoothed))
        
        input("Drücken Sie eine Taste um das Signal zu testen")
        
        call(["./iR_Transmitter", "24", "38000", "0.5", str(len(irCodeStringArraySmoothed)), irCodeStringArraySmoothed])

        if "N" == input("Weiter glätten(Y/N)?:\t"):
            break;
        
        irCodeStringArraySmoothedPrev = irCodeStringArraySmoothed
        irSignalSmoothed = []
        counter += 1
        
    f = open(fileName,"a+")
    f.write(remoteControlName+";BTN_"+buttonName+";"+(irCodeStringArraySmoothed if counter == 1 else irCodeStringArraySmoothedPrev)+"\n")
    f.close()

    if "Y" == input("War das der Letzte Button?:\t"):
        break;
    irSignalSmoothed = []
    irSignal = []
    


