import sys
import json
from subprocess import call
from JSON_Config import data

source = sys.argv[1]
button = sys.argv[2]

#call(["../../../Libs/executable/iR_Transmitter", 
 #      data[source]["Port"], "38000", "0.5", 
  #     str(data[source]["Codes"][button].count(",") + 1), data[source]["Codes"][button]])
 
#print(data[source]["Port"])
#print(str(data[source]["Codes"][button].count(",") + 1))
#print(data[source]["Codes"][button])

print("0")

