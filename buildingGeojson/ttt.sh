word="-31A23"
word2="31"

echo "${word}${word2}" | grep -q '[a-Z]'
if [ $? != 0 ]; then
    echo 'Valid input'
else
    echo 'Innalid input'
fi






if [[ -z $LATITUDE ]] && [[ -z $LONGITUDE ]] && ([[ -n $DATEOFBIRTH ]] || [[ -n $DATEOFBIRTH ]])
then


	if ([[ -n $PLACEOFBIRTH ]] && [ "$PLACEOFBIRTH" != " " ] ) || ( [[ -n $PLACEOFDEATH ]]  && [ "$PLACEOFDEATH" != " " ] )
	then

		echo "${PLACEOFBIRTH}${PLACEOFDEATH}" | grep -q '[0-9]'
		if [ $? != 0 ]; then

		echo $PLACEOFBIRTH"XXX"$PLACEOFDEATH"xxx"
		fi
	fi

fi
