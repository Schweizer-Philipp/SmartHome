import sys
import json
from subprocess import call
from JSON_Config import data

source = sys.argv[1]
button = sys.argv[2]

#+call(["../../../Libs/executable/iR_Transmitter", 
#        "24", "38000", "0.5", 
#        data[source][button].count(",") + 1, data[source][button]])

print("0")

