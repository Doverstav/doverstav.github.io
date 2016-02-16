// Returns the change in population
// r = Growth rate
// N = Current population
// K = Max allowed population

var villageInstances = [];

function getVillageInstances (mapToUse) {
    villageInstances = findAllInstances(mapToUse,village);
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
        villageInstances[i].setPopulation((curPop + deltaPop));
    }
}

function logGrowth (r,N,K) {
    return ((r*N) * (1 - (N/K)));
}
