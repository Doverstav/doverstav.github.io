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
    this.wealth = adjWater*2 + adjMountain*3 + adjFields*1;
    this.population = this.wealth*5;

    this.setDistToCastle = function(dist){
        this.distToCastle = dist;
    }

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
