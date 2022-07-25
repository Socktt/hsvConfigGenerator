class TextThres {
    constructor(text, threshold) {
        this.text = text;
        this.threshold = threshold;
    }

    get object() {
        var obj = new Object();
        obj.text = this.text;
        obj.threshold = this.threshold;
        return obj;
    }
}

class Judgment {
    constructor(colour, fade, text, threshold) {
        this.colour = colour;
        this.fade = fade;
        this.text = text;
        this.threshold = threshold;
    }

    get object() {
        var obj = new Object();
        obj.color = this.colour;
        obj.fade = this.fade;
        obj.text = this.text;
        obj.threshold = this.threshold;
        return obj;
    }
}

function generateFinalJSON(accJudg, afterCutJudg, beforeCutJudg, judg)
{
    var accuracyJudgmentsArray =    accJudg;
    var afterCutAngleJudgments =    afterCutJudg;
    var beforeCutAngleJudgments =   beforeCutJudg;
    var judgmentsArray =            judg;

    var cool = {
        "isDefaultConfig": false,
        "useFixedPos": false,
        "fixedPosX": 0.0,
        "fixedPosY": 0.0,
        "fixedPosZ": 0.0,
        "timeDependencyDecimalPrecision": 1,
        "timeDependencyDecimalOffset": 2,
        "accuracyJudgments": accuracyJudgmentsArray,
        "afterCutAngleJudgments": afterCutAngleJudgments,
        "beforeCutAngleJudgments": beforeCutAngleJudgments,
        "judgments": judgmentsArray,
        "timeDependencyJudgments": null
    };
    return JSON.stringify(cool, null, 2);
}

var currentJudgment = 0;
var currentAccuracyJudgment = 0;
var currentAfterCutAngleJudgment = 0;
var currentBeforeCutAngleJudgment = 0;

document.addEventListener("DOMContentLoaded", function() {
    var output = document.querySelector("#output");
    output.value = ""; 

    document.querySelector("#newJudgment")
        .addEventListener('click', function(event) {
            var elem = document.querySelector("#judgment" + currentJudgment);
            var clone = elem.cloneNode(true);
            currentJudgment++;
            clone.id = "judgment" + currentJudgment;
            elem.after(clone);
        });
    
    document.querySelector("#newAccuracyJudgment")
        .addEventListener('click', function(event) {
            var elem = document.querySelector("#accuracyJudgment" + currentAccuracyJudgment);
            var clone = elem.cloneNode(true);
            currentAccuracyJudgment++;
            clone.id = "accuracyJudgment" + currentAccuracyJudgment;
            elem.after(clone);
        });
    
    document.querySelector("#newAfterCutAngleJudgment")
        .addEventListener('click', function(event) {
            var elem = document.querySelector("#afterCutAngleJudgment" + currentAfterCutAngleJudgment);
            var clone = elem.cloneNode(true);
            currentAfterCutAngleJudgment++;
            clone.id = "afterCutAngleJudgment" + currentAfterCutAngleJudgment;
            elem.after(clone);
        });
    
    document.querySelector("#newBeforeCutAngleJudgment")
        .addEventListener('click', function(event) {
            var elem = document.querySelector("#beforeCutAngleJudgment" + currentBeforeCutAngleJudgment);
            var clone = elem.cloneNode(true);
            currentBeforeCutAngleJudgment++;
            clone.id = "beforeCutAngleJudgment" + currentBeforeCutAngleJudgment;
            elem.after(clone);
        });
    
    document.querySelector("#generate")
        .addEventListener('click', function(event) {
            var accJudg = [];
            var afterCutJudg = [];
            var beforeCutJudg = [];
            var judg = [];
            for(var i = 0; i < currentAccuracyJudgment + 1; i++) {
                var elem = document.querySelector("#accuracyJudgment" + i);
                var text = elem.children.namedItem("text").value;
                var thres = parseInt(elem.children.namedItem("threshold").value);
                accJudg.push(new TextThres(text, thres).object);
            }
            
            for(var i = 0; i < currentAfterCutAngleJudgment + 1; i++) {
                var elem = document.querySelector("#afterCutAngleJudgment" + i);
                var text = elem.children.namedItem("text").value;
                var thres = parseInt(elem.children.namedItem("threshold").value);
                afterCutJudg.push(new TextThres(text, thres).object);
            }
            
            for(var i = 0; i < currentBeforeCutAngleJudgment + 1; i++) {
                var elem = document.querySelector("#beforeCutAngleJudgment" + i);
                var text = elem.children.namedItem("text").value;
                var thres = parseInt(elem.children.namedItem("threshold").value);
                beforeCutJudg.push(new TextThres(text, thres).object);
            }

            for(var i = 0; i < currentJudgment + 1; i++) {
                var elem = document.querySelector("#judgment" + i);
                var red = parseFloat(elem.children.namedItem("red").value);
                var green = parseFloat(elem.children.namedItem("green").value);
                var blue = parseFloat(elem.children.namedItem("blue").value);
                var alpha = parseFloat(elem.children.namedItem("alpha").value);
                var colour = [red, green, blue, alpha];
                
                var fade = elem.children.namedItem("fade").value == "on";
                
                var text = elem.children.namedItem("text").value;
                var thres = parseInt(elem.children.namedItem("threshold").value);
                judg.push(new Judgment(colour, fade, text, thres).object);
            }

            var json = generateFinalJSON(accJudg, afterCutJudg, beforeCutJudg, judg);
            

            var output = document.querySelector("#output");
            output.value = json; 

            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
            element.setAttribute('download', 'config.json');
            element.innerHTML = "Click to download";
            output.after(element);
        });
});
