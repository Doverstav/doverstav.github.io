// Checks if given set coordinates on a map are passable
// (i.e not mountain or water)
function isPassable (x, y, mapToUse) {
    return !(mapToUse[x][y] instanceof mountain || mapToUse[x][y] instanceof water);
}

function isOutOfBounds (x, y, mapToUse) {
    var height = mapToUse.length;
    var width = mapToUse[0].length;
    return !(x < height && x > -1 && y < width && y > -1);
}

// Finds the position of objects of all elements of the given instance
function findAllInstances(mapToUse, instanceToFind) {
    var instances = [];

    for(var i = 0; i < mapToUse.length; i++){
        for(var j = 0; j < mapToUse[i].length; j++){
            if(mapToUse[i][j] instanceof instanceToFind){
                instances.push([i,j]);
            }
        }
    }

    return instances;
}

// Find a path between two coordinates and return it
function findPath (start, stop, mapToUse) {
    var checked = [];
    var queue = [];
    var villages = [];

    queue.push([start]);
    checked.push(start);

    while(queue.length !== 0){
        var path = queue.shift(); // Get shortest path
        var t = path[path.length - 1]; // Take last element without removing it
        var tx = t[0];
        var ty = t[1];

        // If the last element is the one we are looking for
        // return the path
        if((mapToUse[tx][ty]).position.equals(stop)){
            return path;
        }

        var newPath = [];
        // Add all adjacent nodes to paths and push them to the "prio" queue
        // Paths cannot go through moutains
        if(customIndexOf(checked, [(tx+1),ty]) == -1 &&
                        !isOutOfBounds(tx+1, ty, mapToUse) &&
                        isPassable(tx+1, ty, mapToUse)){
            newPath = path.slice();
            checked.push([(tx+1),ty]); // Push node to checked so we dont use it again
            newPath.push([(tx+1),ty]);
            queue.push(newPath.slice()); // Push old path plus new node to prio queue
        }

        if (customIndexOf(checked, [(tx-1),ty]) == -1 &&
                        !isOutOfBounds(tx-1, ty, mapToUse) &&
                        isPassable(tx-1, ty, mapToUse)) {
            newPath = path.slice();
            checked.push([(tx-1),ty]);
            newPath.push([(tx-1),ty]);
            queue.push(newPath.slice());
        }

        if (customIndexOf(checked, [tx,(ty+1)]) == -1 &&
                        !isOutOfBounds(tx, ty+1, mapToUse) &&
                        isPassable(tx, ty+1, mapToUse)) {
            newPath = path.slice();
            checked.push([tx,(ty+1)]);
            newPath.push([tx,(ty+1)]);
            queue.push(newPath.slice());
        }

        if (customIndexOf(checked, [tx,(ty-1)]) == -1 &&
                        !isOutOfBounds(tx, ty-1, mapToUse) &&
                        isPassable(tx, ty-1, mapToUse)) {
            newPath = path.slice();
            checked.push([tx,(ty-1)]);
            newPath.push([tx,(ty-1)]);
            queue.push(newPath.slice());
        }

        queue.sort(function(a, b){return a.length - b.length;}); // This is needed as I'm too lazy to create/use a prio queue
    }

    return null;
}

// Check tiles around an tile (x,y) for a certain instance
// Returns the number of tiles identical to the instance
function checkAdjacentTiles(x, y, scopeX, scopeY, instance, mapToUse){
    var startX = x - scopeX;
    var startY = y - scopeY;
    var endX = x + scopeX;
    var endY = y + scopeY;

    var instanceCounter = 0;
    for(var iY = startY; iY <= endY; iY++){
        for(var iX = startX; iX <= endX; iX++){
            if(!(iX == x && iY == y)){
                if(isOutOfBounds(iX, iY, mapToUse) ||
                    mapToUse[iX][iY] instanceof instance){
                        instanceCounter++;
                    }
            }
        }
    }

    return instanceCounter;
}
