while read line           
do   

echo "$line"

rgb=`echo "$line"  | awk  -F':' '{ print $2; }'  | grep -oP 'color = { \K.*?(?=\ })'`

r=`echo "$rgb"  | awk  -F' ' '{ print $1; }'`
g=`echo "$rgb"  | awk  -F' ' '{ print $2; }'`
b=`echo "$rgb"  | awk  -F' ' '{ print $3; }'`

country=`echo "$line" | grep -oP 'countries/\K.*?(?=\.txt)'`

echo $country is $r$g$b
done <colorProvs.txt
