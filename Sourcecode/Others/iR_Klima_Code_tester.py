import time
from subprocess import call


f = open("/home/pi/Schreibtisch/B_klima.config","r")

for line in f:
    
    split = line.split(";")
    
    print(split[1])
    print(split[2])
    
    time.sleep(15)
    
    call(["./sending_IR_Signal_With_Bytecode_Klima", split[2]])
    
    time.sleep(2)
    
    call(["./sending_IR_Signal_With_Bytecode_Klima",
              "000000100000000000101000000000011100001010000001001011"+
              "0000000010000000000000000000010110000000000001000000000000000000000000000001011100"])
    
    
    