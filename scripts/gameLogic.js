// Returns the change in population
// r = Growth rate
// N = Current population
// K = Max allowed population

var villageInstances = [];
var castleInstances = [];

function getVillageInstances (mapToUse) {
    // Doesnt actually get instances, only positions
    var villagePositions = findAllInstances(mapToUse,village);

    for(var i = 0; i < villagePositions.length; i++){
        villageInstances[i] = mapToUse[villagePositions[i][0]][villagePositions[i][1]];
    }

}

function getCastleInstances (mapToUse) {
    // Doesnt actually get instances, only positions
    var castlePositions = findAllInstances(mapToUse,castle);

    for(var i = 0; i < castlePositions.length; i++){
        castleInstances[i] = mapToUse[castlePositions[i][0]][castlePositions[i][1]];
    }
}

function gameLoop (mapToUse) {
    updateVillagePopulations();
}

function updateVillagePopulations () {
    for(var i = 0; i < villageInstances.length; i++){
        var curPop = villageInstances[i].population;
        var gR = villageInstances[i].growthRate;
        var maxPop = villageInstances[i].maxPop;
        var deltaPop = logGrowth(gR, curPop, maxPop);
        villageInstances[i].setPopulation(Math.round(curPop + deltaPop));
    }
}

function logGrowth (r,N,K) {
    return ((r*N) * (1 - (N/K)));
}
