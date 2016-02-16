// Returns the change in population
// r = Growth rate
// N = Current population
// K = Max allowed population
function logGrowth (r,N,K) {
    return ((r*N) * (1 - (N/K)));
}
