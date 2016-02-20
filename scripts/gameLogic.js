// Returns the change in population
// r = Growth rate
// N = Current population
// K = Max allowed population

var villageInstances = [];
var castleInstances = [];

// TODO Combine with function below
function getVillageInstances (mapToUse) {
    // Doesnt actually get instances, only positions
    var villagePositions = findAllInstances(mapToUse,village);

    for(var i = 0; i < villagePositions.length; i++){
        villageInstances[i] = mapToUse[villagePositions[i][0]][villagePositions[i][1]];
    }
}

// TODO Combine with function above
function getCastleInstances (mapToUse) {
    // Doesnt actually get instances, only positions
    var castlePositions = findAllInstances(mapToUse,castle);

    for(var i = 0; i < castlePositions.length; i++){
        castleInstances[i] = mapToUse[castlePositions[i][0]][castlePositions[i][1]];
    }
}

function gameLoop (mapToUse) {
    updateVillagePopulations();
    updateCastlePopulations();
}

// TODO COmbine with function below
function updateVillagePopulations () {
    for(var i = 0; i < villageInstances.length; i++){
        var curPop = villageInstances[i].population;
        var gR = villageInstances[i].growthRate;
        var maxPop = villageInstances[i].maxPop;
        var deltaPop = logGrowth(gR, curPop, maxPop);
        villageInstances[i].setPopulation(Math.round(curPop + deltaPop));
    }
}

// TODO Combine with function above
function updateCastlePopulations () {
    for(var i = 0; i < castleInstances.length; i++){
        var curPop = castleInstances[i].population;
        var gR = castleInstances[i].growthRate;
        var maxPop = castleInstances[i].maxPop;
        var deltaPop = logGrowth(gR, curPop, maxPop);
        castleInstances[i].setPopulation(Math.round(curPop + deltaPop));
    }
}

function logGrowth (r,N,K) {
    return ((r*N) * (1 - (N/K)));
}
