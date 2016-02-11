// TODO: How to give this method access to the map in a nice way?

function myKeyPress(e){
    var keynum;
    if(window.event){ // IE
        keynum = e.keyCode;
    } else if(e.which){ // Other browsers
            keynum = e.which;
    }

    keynum = (String.fromCharCode(keynum).toLowerCase());

    oldMarker = marker.slice();

    if(keynum == "w" && !isOutOfBounds(marker[0] - 1, marker[1], map)){
        marker[0] = marker[0] - 1;
        marker[1] = marker[1];
    } else if (keynum == "a" && !isOutOfBounds(marker[0], marker[1] - 1, map)){
        marker[0] = marker[0];
        marker[1] = marker[1] - 1;
    } else if (keynum == "s" && !isOutOfBounds(marker[0] + 1, marker[1], map)){
        marker[0] = marker[0] + 1;
        marker[1] = marker[1];
    } else if (keynum == "d" && !isOutOfBounds(marker[0], marker[1] + 1, map)){
        marker[0] = marker[0] ;
        marker[1] = marker[1] + 1;
    } else if (keynum == "q"){
        alert("Q");
    } else if (keynum == "e"){
        iterateWaterMap(map);
    }

    updateMap(map);
}

function updateMap(mapToUpdate){
    document.getElementById(oldMarker).outerHTML = mapToUpdate[oldMarker[0]][oldMarker[1]].token;
    document.getElementById(marker).outerHTML = "<span class=\"marker\" id=\""+marker+"\">X</span>"; // Set marker

    updateInfoPanel(mapToUpdate, marker);
    updateZoomPanel(mapToUpdate, marker);
}

function updateInfoPanel(mapToUse, markerToUse){
    var selected = mapToUse[markerToUse[0]][markerToUse[1]];
    var infoText = "";

    infoText = selected.info + "<br>X: " + markerToUse[0] + " Y: " + markerToUse[1] + "<br>" +
                "Wealth: " + selected.wealth + "<br>" +
                "Population: " + selected.population + "<br>" +
                "Distance to castle:" + selected.distToCastle + "<br>";

    document.getElementById("infoDiv").innerHTML = infoText;
}

function updateZoomPanel (mapToUse, markerToUse) {
    var selected = mapToUse[markerToUse[0]][markerToUse[1]];
    var zoomText = selected.zoom;

    document.getElementById("zoomDiv").innerHTML = zoomText;
}

function printMap(mapToPrint) {
    var height = mapToPrint.length;
    var width = mapToPrint[0].length;
    var mapStringified = "";
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            mapStringified = mapStringified.concat(mapToPrint[i][j].token);
        }
        mapStringified = mapStringified.concat("<br>");
    }

    document.getElementById("mapDiv").innerHTML = mapStringified;
}
