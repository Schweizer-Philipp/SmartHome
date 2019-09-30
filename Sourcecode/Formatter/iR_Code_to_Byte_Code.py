
fileName = input("Wechle Datei soll Benutzt werden")
startNumber = input("Mit welcher Zahl geht der Bytecode los?")
numberFor0 = input("Nummer die folgen muss das es eine 0 ist")
numberFor1 = input("Nummer die folgen muss das es eine 1 ist")

f = open(fileName,"r")
f1 = open("B_"+fileName,"a+")
for line in f:
    
    split = line.split(";")
    splitCodes = split[2].split(",")
    byteCode = ""
    i = 0
    
    while True:
        
        if (i + 1) >= len(splitCodes):
            break
        
        if splitCodes[i] == startNumber:
            
            if splitCodes[i+1] == numberFor0:
                byteCode = byteCode + "0"
                
            else:
                byteCode = byteCode + "1"
                
            i = i + 1
        i = i + 1
        
    f1.write(split[0]+";"+split[1]+";"+byteCode+"\n")
    

f.close()
f1.close()
        
    
