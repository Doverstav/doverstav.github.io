// =======================================================
// SOME COOL ARRAY SHIT RIGHT HERE TY STACK OVERFLOW
// =======================================================

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// Warn if overriding existing method
if(Array.prototype.shuffle){
    console.warn("Overriding existing Array.prototype.shuffle. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// Attach shuffle to Arrays prototype
Array.prototype.shuffle = function () {
    var counter = this.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = this[counter];
        this[counter] = this[index];
        this[index] = temp;
    }
};
// Hide method
Object.defineProperty(Array.prototype, "shuffle", {enumerable: false});

// ================================================================
// COOL ARRAY SHIT ENDS
// ================================================================

// Seedable random function
function customRandom (seed) {
    var x = Math.sin(seed++) * 10000; // 10000 gives good distribution, lowers gives patterns
    return x - Math.floor(x);
}

function genSeed() {
    var d = new Date();
    return d.getTime();
}

function customIndexOf (toLookIn, toLookFor) {
    for(var i = 0; i < toLookIn.length; i++){
        var item = toLookIn[i];
        if (item.equals(toLookFor)){
            return i;
        }
    }
    return -1;
}
