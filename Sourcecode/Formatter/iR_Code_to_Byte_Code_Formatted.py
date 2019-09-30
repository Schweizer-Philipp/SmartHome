
fileName = input("Wechle Datei soll Benutzt werden")

f = open(fileName,"r")
f1 = open("B_Formatted_"+fileName,"a+")
byteSize = 8

codeList = []

for i, line in enumerate(f):
    
    split = line.split(";")
    
    f1.write(split[1]+":\t\t")
    codeList.append([])
    for j in range(int((len(split[2])/byteSize))):
        
        codeList[i].append(split[2][byteSize*j:byteSize*(j+1)])
    
f1.write("\n")

for i in range(len(codeList[0])):
        
        for j in range(len(codeList)):
            
            f1.write(codeList[j][i]+"\t\t")
            
        f1.write("\n")



    

f.close()
f1.close()
                
        
    
