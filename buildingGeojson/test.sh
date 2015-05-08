INPUT=someletters_12fd345_moreleters.ext
SUBSTRING=`echo $INPUT| cut -d'_' -f 2`
echo $SUBSTRING
