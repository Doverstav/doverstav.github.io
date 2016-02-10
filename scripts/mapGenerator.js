var marker = [0,0];
var map;

function init () {
    map = mapGen(25, 50);
    printMap(map);
    updateMap(map);
}

// Heigth is number of rows in map, width is number of columns.
// map[x] gives the whole row x of map, and map[x][y] gives element y in row x
function mapGen (height, width){
    var d1 = new Date();
    var t1 = d1.getTime();

    var newMap = fillMap(height, width);
    var d2 = new Date();
    var t2 = d2.getTime();
    placeLakes(newMap);
    var d3 = new Date();
    var t3 = d3.getTime();
    placeMountains(newMap);
    var d4 = new Date();
    var t4 = d4.getTime();
    placeCastle(newMap);
    var d5 = new Date();
    var t5 = d5.getTime();
    placeVillages(newMap);
    var d6 = new Date();
    var t6 = d6.getTime();
    createPaths(newMap);

    var d7 = new Date();
    var t7 = d7.getTime();

    console.log("Time for filling: " + (t2-t1));
    console.log("Time for laking: " + (t3-t2));
    console.log("Time for mountaning: " + (t4-t3));
    console.log("Time for castling: " + (t5-t4));
    console.log("Time for villaging: " + (t6-t5));
    console.log("Time for pathing: " + (t7-t6));
    console.log("Total time: " + (t7-t1));
    return newMap;
}

function fillMap (height, width) {
    var newMap = new Array(height);
    for(var i = 0; i < height; i++){
        newMap[i] = new Array(width);
        for(var j = 0; j < width; j++){
            newMap[i][j] = new forest([i,j]);
        }
    }
    return newMap;
}

// Supposed to work like a cellular automata
// Should take a map, initial distribution and amount of iterations
// TODO: Should it also take rules for adding/removing water,
// i.e. amount of nearby water tiles?
// TODO: Larger maps seem sparser with the same initDist as smaller ones
// Change initDist based on size somehow
// TODO: Interations as parameter? 5 seems like maximum needed,
// afterwards equilibrium is reached
// TODO: Experiment with other rules in iteration step
// TODO: Add horizontal fill?
// Source: http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
function placeLakes (mapToUse) {
    var initDist = 0.25; // MAGIC NUMBER HO!
    var iterations = 5;

    var height = mapToUse.length;
    var width = mapToUse[0].length;

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            // If random number less than initDist, we will add a lake
            // Giving initDist as a sort or percentage distribution
            if(customRandom(Math.random()*100) < initDist){
                mapToUse[i][j] = new water([i,j]);
            }
        }
    }

    for(i = 0; i <= iterations; i++){
        iterateWaterMap(mapToUse);
    }
}

// TODO: Generalize so needed tiles for transformation can be given as params?
function iterateWaterMap (mapToUse) {
    var height = mapToUse.length;
    var width = mapToUse[0].length;

    // Create spooky ghost array to save result;
    ghostMap = [];
    for(var x = 0; x < height; x++){
        ghostMap[x] = mapToUse[x].slice();
    }

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            // For every position in the map
            var adjWater = checkAdjacentTiles(i,j,1,1,water,mapToUse);

            if(mapToUse[i][j] instanceof water){
                if(adjWater >= 4){
                    ghostMap[i][j] = new water([i,j]);
                }
                if(adjWater < 2){
                    ghostMap[i][j] = new forest([i,j]);
                }
            } else {
                if(adjWater >= 5){
                    ghostMap[i][j] = new water([i,j]);
                }
            }
        }
    }

    for(x = 0; x < height; x++){
        mapToUse[x] = ghostMap[x].slice();
    }
}

function placeMountains (mapToUse) {
    var initDist = 0.25; // MAGIC NUMBER HO!
    var iterations = 5;

    var height = mapToUse.length;
    var width = mapToUse[0].length;

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            // If random number less than initDist, we will add a lake
            // Giving initDist as a sort or percentage distribution
            if(mapToUse[i][j] instanceof forest && customRandom(Math.random()*100) < initDist){
                mapToUse[i][j] = new mountain([i,j]);
            }
        }
    }

    for(i = 0; i <= iterations; i++){
        iterateMountainMap(mapToUse);
    }
}

// TODO: Generalize so needed tiles for transformation can be given as params?
// TODO: Experiment with rules for adding/deleting moutanins, see what gives good result
// TODO: Essentially identical to waterMap, generalize
function iterateMountainMap (mapToUse) {
    var height = mapToUse.length;
    var width = mapToUse[0].length;

    // Create spooky ghost array to save result;
    ghostMap = [];
    for(var x = 0; x < height; x++){
        ghostMap[x] = mapToUse[x].slice();
    }

    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            // For every position in the map
            var adjMountain = checkAdjacentTiles(i,j,1,1,mountain,mapToUse);
            var adjWater = checkAdjacentTiles(i,j,1,1,water,mapToUse);

            if(mapToUse[i][j] instanceof mountain){
                if(adjMountain >= 4){
                    ghostMap[i][j] = new mountain([i,j]);
                }
                if(adjMountain < 2){
                    ghostMap[i][j] = new forest([i,j]);
                }
            } else  {
                if(adjMountain >= 5){
                    ghostMap[i][j] = new mountain([i,j]);
                }
            }
        }
    }

    for(x = 0; x < height; x++){
        mapToUse[x] = ghostMap[x].slice();
    }
}

// To wiegth lake and mountainside more - Add all empty tiles to an array.
// Tiles next to mountains or lakes get severral copies in array, adjust to
// get good result
function placeVillages (mapToUse) {
    // Find all forests as this is where we can place villages
    var possibleVillages = findAllInstances(mapToUse, forest);
    var newInstances = [];
    //var castlePos = findAllInstances(mapToUse, castle).pop();

    for(var i = 0; i < possibleVillages.length; i++){
        var currentPos = possibleVillages[i];
        var adjWater = checkAdjacentTiles(currentPos[0], currentPos[1], 1, 1, water, mapToUse);
        var adjMountain = checkAdjacentTiles(currentPos[0], currentPos[1], 1, 1, mountain, mapToUse);

        // For each mountain and water adjacent to pos, add five instances of it to list
        for(var j = 0; j < (adjWater + adjMountain)*5; j++){
            newInstances.push(currentPos);
        }
    }

    // Concatenate the two arrays
    var allPossible = possibleVillages.concat(newInstances);

    // Place the villages
    for(i = 0; i < 10; i++){
        var index = Math.floor(Math.random()*allPossible.length);
        var villageSite = allPossible[index];
        var vX = villageSite[0];
        var vY = villageSite[1];
        // Only place village if tile is empty and no villages in 2 tile radius
        if(mapToUse[vX][vY] instanceof forest &&
                checkAdjacentTiles(vX,vY,2,2,village,mapToUse) === 0){
            mapToUse[vX][vY] = new village([vX, vY]);
            /*
            // Experimentl, method takes double the time with this
            // Script sometimes freezes
            if(findPath(villageSite, castlePos, mapToUse) === null){
                mapToUse[vX][vY] = new forest([vX,vY]);
                i--;
            }
            */

        } else {
            i--;
        }
    }
}

function placeCastle (mapToUse) {
    var height = mapToUse.length;
    var width = mapToUse[0].length;
    var castlePlaced = false;
    while(!castlePlaced){
        var rx = Math.floor(customRandom(genSeed())*height);
        var ry = Math.floor(customRandom(genSeed())*width);
        marker = [rx,ry];
        if(mapToUse[rx][ry] instanceof forest){
            mapToUse[rx][ry] = new castle([rx,ry]);
            castlePlaced = true;
        }
    }
}

function createPaths (mapToUse) {
    // pop() is used as the position for castle is returned as an
    // array of positions, which in turn are arrays of size two,
    // as there is only one, we must pop the
    // element to be able to use it as a single position
    // TODO: If we want more castles, make method iterate through
    // list of positions of castles
    var castlePos = findAllInstances(mapToUse, castle).pop();
    var villagesPos = findAllInstances(mapToUse, village);

    // Pave between castle and all villages
    for(var i = 0; i < villagesPos.length; i++){
        path = findPath(castlePos, villagesPos[i], mapToUse);
        if(path !== null){ // Dont pave if no path
            layRoad(path, mapToUse);
        }
    }

    //roadToClosestVillage(mapToUse);
}

// USELESS POS mebbe throw away?
function roadToClosestVillage (mapToUse) {
    var villagePos = findAllInstances(mapToUse, village);
    var paths = [];

    // Find pairs
    for(var i = 0; i < villagePos.length; i++){
        var shortestPath;
        for(var j = 0; j < villagePos.length; j++){
            var newPath = findPath(villagePos[i], villagePos[j], mapToUse);
            if(i != j){
                if (typeof shortestPath === "undefined") {
                    console.log("UNDEFINED!");
                    shortestPath = newPath;
                } else if (shortestPath.length > newPath.length){
                    shortestPath = newPath;
                }
            }
        }
        paths.push(shortestPath);
    }

    for(i = 0; i < paths.length; i++){
        layRoad(paths[i], mapToUse);
    }
}

// Connects two endpoints on a path by lay road.
// Endpoints are not paved.
// TODO: Road cleanup: check all road, determine if they are superfluous, if so remove it
function layRoad (path, mapToUse) {
    for(var i = 1; i < path.length-1; i++){ // Do not pave endpoints
        current = path[i];
        past = path[i-1];

        // Only if current tile is forest can we pave
        // But roads can pass through towns (as specified in findPath and isPassable)
        if(!(mapToUse[current[0]][current[1]] instanceof village)){
            if(current[0] != past[0]){
                mapToUse[current[0]][current[1]] = new road(current);
            } else {
                mapToUse[current[0]][current[1]] = new road(current);
            }
        }
    }
}

// TODO: Useless as problems were ish fixed in findPath?
// Construct graph of roads, check for articulation points
function cleanUpRoads (mapTouse){
    /*
    ALGO:
    DFS from castle on villages and roads.
    Remove all non-articulation points from resulting trees
    EXCEPTION: Root (castle) is never articulation point
    END

    As only articulation points remain, all roads
    */

}
