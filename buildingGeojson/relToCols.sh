while read line           
do   

#echo "$line"

#rgb=`echo "$line"  | awk  -F':' '{ print $2; }'  | grep -oP 'color = { \K.*?(?=\ })'`

color=`echo "$line" | grep -oP 'color = { \K.*?(?=\ })'`

r=`echo "$color"  | awk  -F' ' '{ print $1; }'`
g=`echo "$color"  | awk  -F' ' '{ print $2; }'`
b=`echo "$color"  | awk  -F' ' '{ print $3; }'`

#color=`echo "$line" | grep -oP '\K.*?(?=\ = {)'`


newCountry=`echo "$line" | grep -oP '\K.*?(?=\ = {)'`

if [ -n "$color" ]
then
r=`echo "$r*255" | bc -l` 
g=`echo "$g*255" | bc -l` 
b=`echo "$b*255" | bc -l` 

r=`printf '%.*f\n' 0 $r`
g=`printf '%.*f\n' 0 $g`
b=`printf '%.*f\n' 0 $b`

echo \"$oldCountry\" : [\"$oldCountry\",\"rgb\($r,$g,$b\)\"]\, >> relCols.csv
fi
oldCountry=$newCountry


done <relCols0.txt
