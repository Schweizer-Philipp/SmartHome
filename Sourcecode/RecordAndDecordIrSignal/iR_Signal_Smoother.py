import math
from collections import Counter
from minimum import getMinimum

basis = 100
averageCalcBasis = 50

def isListFinished(tupelList, needle):
    
    for (level, number) in tupelList:
        if level == needle:
            return False
        
    return True
    

def smooth_IR_Signal(irSignal, irSignalSmoothed, smoothLevel):
    
    tupelList = []
    averagePerLevel = {}
    
    border = basis * smoothLevel
    
    #print("border:" + str(border))
    
    for number in irSignal:
        tupelList.append((0,number))
        
    minimum = 0
    level = 1
    
    #print(irSignal)
    #print("--------------------------------------")
    #print(tupelList)
        
    while isListFinished(tupelList, 0) == False:
        
        minimum = getMinimum(tupelList,minimum,0) + border
        
        
        for index, (levelinList, number) in enumerate(tupelList):
            
            if levelinList == 0:
                if number <= minimum:
                    tupelList.pop(index)
                    tupelList.insert(index, (level, number))
        
        level = level +1
        
    #print("tupelList:")
    #print(tupelList)
       
    for (level,number) in tupelList:
        averagePerLevel[level] = int(averagePerLevel.get(level, 0)) + number
        
    #print("averagePerLevel:")
    #print(averagePerLevel)
    
    amountOfEntrysPerLevel = Counter(tupel[0] for tupel in tupelList)
    
    #print("amountOfEntrysPerLevel:")
    #print(amountOfEntrysPerLevel)
    
    for level in averagePerLevel:
        
          averageValue = (int(averagePerLevel.get(level, "Error")) / int(amountOfEntrysPerLevel.get(level, "Error")))
          
          print("Level: "+str(level)+", AverageValue: "+str(averageValue))
          
          moduloRemainder = averageValue % averageCalcBasis
          if moduloRemainder>=25:
              averagePerLevel[level] = averageValue + (averageCalcBasis-moduloRemainder)
          else:
              averagePerLevel[level] = averageValue - moduloRemainder
          
    print("averagePerLevel:")
    print(averagePerLevel)
    
    for level, value in tupelList:
        irSignalSmoothed.append(int(averagePerLevel.get(level, "Error")))
        
    #print("irSignalSmoothed:")
    print(irSignalSmoothed)
    