f = open("B_klima.config", "r")

for line in f:
    data = line.split(";")
    newData = "\"" + data[1] + "\": \"3350,1700," + data[2].strip(" \n\r").replace("0", "400,400,").replace("1", "400,1300,") + "400\","
    
    print(newData)

