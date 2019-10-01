import time
from subprocess import call


f = open("../../Config/B_klima.config","r")

for line in f:
    
    split = line.split(";")
    
    print(split[1])
    print(split[2])
    
    time.sleep(15)
    
    call(["./sending_IR_Signal_With_Bytecode_Klima", split[2]])
    
    time.sleep(2)
    
	
    
    
    