// TODO: How to give this method access to the map in a nice way?

function myKeyPress(e){
    var keynum;
    if(window.event){ // IE
        keynum = e.keyCode;
    } else if(e.which){ // Other browsers
            keynum = e.which;
    }

    keynum = (String.fromCharCode(keynum).toLowerCase());

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
        console.log(findAllInstances(map, village));
        var coolRoad = findPath([1,1], [4,6], map);
        layRoad(coolRoad, map);
        printMap(map);
    } else if (keynum == "e"){
        iterateWaterMap(map);
    }

    updateMap(map);
}

function updateMap(mapToUpdate){
    var height = mapToUpdate.length;
    var width = mapToUpdate[0].length;
    var mapStringified = "";
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            if(i == marker[0] && j == marker[1]){ // Paint marker
                mapStringified = mapStringified.concat("<span class=\"marker\">X</span>");
            } else {
                mapStringified = mapStringified.concat(mapToUpdate[i][j].token);
            }
        }
        mapStringified = mapStringified.concat("<br>");
    }
    document.getElementById("mapDiv").innerHTML = mapStringified;
    updateInfoPanel(mapToUpdate, marker);
    updateZoomPanel(mapToUpdate, marker);
}

function updateInfoPanel(mapToUse, markerToUse){
    var selected = mapToUse[markerToUse[0]][markerToUse[1]];
    var infoText = "";

    infoText = selected.info + "<br>X: " + markerToUse[0] + " Y: " + markerToUse[1];

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
            mapStringified = mapStringified.concat(mapToPrint[i][j]);
        }
        mapStringified = mapStringified.concat("<br>");
    }

    document.getElementById("mapDiv").innerHTML = mapStringified;
}
