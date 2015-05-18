function getAreaChecked()
{
    var oRadio = document.getElementById("colorFeat")

    for(var i = 0; i < oRadio.length; i++)
    {
        if(oRadio[i].checked)
        {
            return oRadio[i].value;
        }
    }

    return '';
}