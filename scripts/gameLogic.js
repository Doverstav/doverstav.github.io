// Returns the change in population
// r = Growth rate
// N = Current population
// K = Max allowed population

var villageInstances = [];

function getVillageInstances (mapToUse) {
    villageInstances = findAllInstances(mapToUse,village);
}

function logGrowth (r,N,K) {
    return ((r*N) * (1 - (N/K)));
}
