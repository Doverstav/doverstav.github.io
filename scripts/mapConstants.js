function village (pos, adjWater, adjMountain,adjFields) {
    this.token = "<span class=\"village\" id=\"" + pos + "\">V</span>";
    this.info = "A small village, mostly farmers live here.";
    this.zoom = "_/^\\_ <br>" +
                "|_*_|__<br>" +
                "|_*__*_|<br>" +
                "|_#__#_|<br>";
    this.position = pos;
    this.adjWater = adjWater;
    this.adjMountain = adjMountain;
    this.adjFields = adjFields;
    this.distToCastle = 0;
    this.wealth = 0;
    this.population = 0;
    this.maxPop = 0;
    this.growthRate = 0;
    this.baseGrowth = 0.10; // Subject to tweaking

    this.setDistToCastle = function(dist){
        this.distToCastle = dist;
        this.calculateWealth();
        this.calculatePopulation();
        this.setMaxPop();
        this.setGrowthRate();
    };

    this.calculateWealth = function () {
        this.wealth = Math.round((adjWater*2 + adjMountain*3 + adjFields*1)
                                    *(1 - this.distToCastle/100));
    };

    this.calculatePopulation = function () {
        this.population = Math.round(this.wealth*10*(1 - this.distToCastle/100));
    };

    this.setMaxPop = function () { // MaxPop = startingPop*5
        this.maxPop = Math.round(this.wealth*50*(1 - this.distToCastle/100));
    };

    this.setGrowthRate = function () {
        this.growthRate = (this.baseGrowth + (this.wealth/100))*(1 - this.distToCastle/100);
    };

    this.setPopulation = function(newPop) {
        this.population = newPop;
    };

}

function lair (pos) {
    this.token = "L";
    this.info = "Your lair. This is where you plan raids and store your treaure.";
    this.position = pos;
}

function road (pos){
    this.info = "A road linking villages together.";
    this.position = pos;
    this.token = "<span class=\"road\" id=\"" + pos + "\">.</span>";
    this.zoom = "&nbsp;* /.&nbsp;&nbsp;/<br>" +
                "&nbsp;^/&nbsp;&nbsp;./<br>" +
                "*/&nbsp;&nbsp;&nbsp;/<br>" +
                "/.&nbsp;&nbsp;/ &nbsp;^<br>";
}

function water (pos){
    this.info = "A body of water. It's wet.";
    this.position = pos;
    this.zoom = "&nbsp;___&nbsp;&nbsp;<br>" +
                "/ ~ \\__<br>" +
                "\\ ~  ~ &nbsp;\\<br>" +
                "/__~___/<br>";
    this.token = "<span class=\"water\" id=\"" + pos + "\">W</span>";
}

function forest (pos) {
    this.info = "Just a bunch of trees and rocks, nothing of real interest.";
    this.token = "<span class=\"forest\" id=\"" + pos + "\">*</span>";
    this.zoom = "/^|^\\<br>" +
                "\\^|^/<br>" +
                "&nbsp;(|) &nbsp;_<br>" +
                "__|__/_\\<br>";
    this.position = pos;
}

function mountain (pos) {
    this.info = "A large, impassable mountain.";
    this.token = "<span class=\"mountain\" id=\"" + pos + "\">M</span>";
    this.zoom = "&nbsp;&nbsp;&nbsp;&nbsp;_<br>" +
                "&nbsp;&nbsp;&nbsp;/ |<br>" +
                "&nbsp;_/ \\-\\<br>" +
                "/ \\ /| |<br>";
    this.position = pos;
}

function castle (pos) {
    this.info = "A big stone castle. This is where the king and his knights reside.";
    this.token = "<span class=\"castle\" id=\"" + pos + "\">C</span>";
    this.zoom = "/^\\&nbsp;&nbsp;/^\\<br>" +
                "|*|__|*|<br>" +
                "|*|..|*|<br>" +
                "|_|##|_|<br>";
    this.position = pos;
    this.wealth = 0;
    this.maxPop = 0;
    this.growthRate = 0;
    this.baseGrowth = 0.15; // Subject to tweaking

    this.initCastle = function(wealth, population) {
        this.setWealth(wealth);
        this.setPopulation(population);
        this.setMaxPop();
        this.setGrowthRate();
    }

    this.setWealth = function (wealth) {
        this.wealth = wealth;
    };

    this.setPopulation = function (population) {
        this.population = population;
    };

    this.setMaxPop = function () { // MaxPop = startingPop*10
        this.maxPop = Math.round(this.wealth*100);
    };

    this.setGrowthRate = function () {
        this.growthRate = (this.baseGrowth + (this.wealth/100));
    };

    this.setPopulation = function(newPop) {
        this.population = newPop;
    };
}

function field (pos) {
    this.info = "A field where the farmers grow their crops or let their cattle feed";
    this.token = "<span class=\"field\" id=\"" + pos + "\">F</span>";
    this.zoom = "EMPTYEMP<br>" +
                "EMPTYEMP<br>" +
                "EMPTYEMP<br>" +
                "EMPTYEMP<br>";
    this.position = pos;
}
