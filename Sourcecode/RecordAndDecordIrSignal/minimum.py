import sys

def getMinimum(tupleList, border, notice):
    
    minimum = sys.maxsize
    
    for (level, number) in tupleList:
        
        if level == notice:
            if number > border and number < minimum:
                minimum = number
                
    return minimum            
            
    