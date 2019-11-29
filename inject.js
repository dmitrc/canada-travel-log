// ==UserScript==
// @name         Presence converter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Convert the days from JSON to the presence calculator form
// @author       You
// @match        https://eservices.cic.gc.ca/rescalc/rescalcwizard.do
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var destination;
    var from;
    var to;
    var reason;
    var submit;

    function fetchJSON(fn) {
        var jsonUrl = "http://127.0.0.1:8080/travel.json";

        fetch(jsonUrl)
            .then((res) => res.json())
            .then((json) => fn && fn(json))
            .catch(() => alert("Couldn't download/parse the JSON file!"));
    }

    function parseData(json) {
        var results = [];
        var didEnterCanada = false;

        for (var i = 0; i < json.length; ++i) {
            var item = json[i];

            if (item.Country == "Canada") {
                didEnterCanada = true;
                continue;
            }

            if (!didEnterCanada) {
                continue;
            }

            var result = {
                country: item.Country,
                from: item.From,
                to: item.To,
                why: "City: " + item.City + ". Reason: " + item.Reason + "."
            };

            var lastItem = null;
            var lastIndex = -1;
            var otherPlaces = [];

            for (var j = i+1; j < json.length; ++j) {
                var nextItem = json[j];

                if (nextItem.Country == "Canada") {
                    break;
                }

                lastItem = nextItem;
                lastIndex = j;

                var otherPlace = nextItem.Country + " (" + nextItem.City + ")";
                if (otherPlaces.indexOf(otherPlace) < 0) {
                    otherPlaces.push(otherPlace);
                }
            }

            if (lastItem) {
                result.to = lastItem.To;
                result.why += " Other stops: " + otherPlaces.join(", ") + ".";
                i = lastIndex;
            }

            results.push(result);
        }

        return results;
    }

    function addAbsence(country, f, t, why) {
        destination.value = findCountry(country);
        from.value = f;
        to.value = t;
        reason.value = why;

        submit.click();
    }

    function findCountry(country) {
        if (country == "USA") {
            country = "United States of America";
        }
        else if (country == "Netherlands") {
            country = "Netherlands, The";
        }
        // [expand this as needed if you are seeing blank countries in the generated list]

        var options = destination.children;
        for (var i = 0; i < options.length; ++i) {
            var option = options[i];
            if (option.innerText.trim() == country) {
                return option.getAttribute("value");
            }
        }
    }

    function main() {
        var counter = GM_getValue('counter', 0);

        if (counter == 0 && !confirm("Run presence converter?")) {
            return;
        }

        destination = document.getElementById("absenDestination");
        from = document.getElementById("absenceFromDate");
        to = document.getElementById("absenceToDate");
        reason = document.getElementById("absencesReason");
        submit = document.querySelector('input[name="add.abs"]');

        fetchJSON((json) => {
            var absences = parseData(json);
            console.log(absences);

            if (counter < absences.length) {
                GM_setValue('counter', counter + 1);

                var a = absences[counter];
                addAbsence(a.country, a.from, a.to, a.why);
            }
            else {
                GM_setValue('counter', 0);
                alert("Done! " + absences.length + " absences reported!");
            }
        });
    }

    main();
})();