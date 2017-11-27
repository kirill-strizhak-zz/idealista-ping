// ==UserScript==
// @name         Idealista Ping
// @description  Script to automatically refresh Idealista page and notify about new advertisments
// @namespace    https://www.idealista.com/
// @version      1.2
// @author       k.strizhak84@gmail.com
// @match        https://www.idealista.com/alquiler-viviendas/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var BEEP_MP3 =
        "data:audio/mp3;base64,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" +
        "1MjczsJyzJuBu26lg6vDpm6ZtYIByrcoU50vwPYptqABBcHq6YgBiuPNy/DOmliA184Zme7u6zisO/3X450ctjEOQx9Ts7QQ8/ScKHKCF4wqnrkiCGQhvn4bhamGDl" +
        "/VF791CpwRjAGw6VV7vbmREdI4zWAihEUONSdirxaYeMLCOPS8wRpBp5J55qmQ49EMjBnWliU0yCFlCakA3/yptrftf9/131P3/1f9vV//YbBQaktjKREbOUw7Szsa" +
        "ZESaE5QdQdbYlE+tCfK5mfQXtHz5iTyHH8K6EhOFMANwBkWJXK5E4kDAIBAIBBRFGSJGcapmc8zPaqJUDDgUAgyVVW//tVVX/c0jP/9d5ye5GaeWp5IkdanntVZ39U" +
        "8t+8zJFH/zjkZntVf1r5OVVVrAyINPEQNBoGhKGlPDoKrBp5bYoOli3iWCtrOIg7TEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5" +
        "LErAASARMPLCR4im+tX8mHmThVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" +
        "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" +
        "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" +
        "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" +
        "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

    var BEEP_COUNT = 2;
    var BEEP_INTERVAL = 500;

    var SEL_ITEM_CONTAINER = ".items-container";
    var SEL_ITEMS = "div.item[data-adid!=''][data-adid]";
    var SEL_LOGO = ".logo-container";

    var AD_ID = "data-adid";

    var TOGGLE_BUTTON_ID = "idp-toggle";
    var TOGGLE_BUTTON_STYLE = "position: absolute; top: 11px; left: 125px;";

    var RELOAD_COUNTER_STYLE = "font-size: small; color:red; position: absolute; top: 0; left: 200px; display: inline-flex;";
    var RELOAD_INTERVAL = 4;
    var RELOAD_INTERVAL_MIN = 3;
    var RELOAD_INTERVAL_MAX = 6;
    var RELOAD_INTERVAL_UNIT_MULTIPLYER = 60000;
    var RELOAD_INTERVAL_UNIT_NAME = "minutes";

    var enabledSites = GM_getValue("enabledSites") || {
        "https://www.idealista.com/alquiler-viviendas/barcelona-barcelona/con-precio-hasta_850,de-dos-dormitorios,de-tres-dormitorios,de-cuatro-cinco-habitaciones-o-mas,amueblado_amueblados,publicado_ultimas-24-horas/?ordenado-por=fecha-publicacion-desc": true,
        "https://www.idealista.com/alquiler-viviendas/badalona-barcelona/con-precio-hasta_850,de-dos-dormitorios,de-tres-dormitorios,de-cuatro-cinco-habitaciones-o-mas,amueblado_amueblados,publicado_ultimas-24-horas/?ordenado-por=fecha-publicacion-desc": true
    };

    var isEnabled = false;
    if (enabledSites[window.location.href] === true) {
        isEnabled = true;
        console.log("This is an enabled site!");
    } else {
        console.log("Never heard of this one before");
    }

    console.log("Last load time: " + new Date());
    addToggleButton(isEnabled);
    if (isEnabled) {
        var siteId;
        if (window.location.href.match("badalona-barcelona")) {
            document.title = "Badalona";
            siteId = 1;

        } else if (window.location.href.match("sant-adria-de-besos")) {
            document.title = "Sant Adriá";
            siteId = 2;

        } else if (window.location.href.match("baix-llobregat-sud")) {
            document.title = "Baix Llobregat Sud";
            siteId = 3;

        } else {
            document.title = "Barcelona";
            siteId = 0;
        }

        waitToLoad(SEL_ITEM_CONTAINER);
    }

    function addToggleButton(isEnabled) {
        var button = $("<button/>", {
            id: TOGGLE_BUTTON_ID,
            style: TOGGLE_BUTTON_STYLE,
            "idp-enabled": isEnabled
        });
        if (isEnabled) {
            button.text("Disable");
        } else {
            button.text("Enable");
        }
        $(SEL_LOGO).append(button);

        button.click(function() {
            var sites = GM_getValue("enabledSites") || {};
            var toggle = $("#" + TOGGLE_BUTTON_ID);
            var enabled = toggle.attr("idp-enabled");
            console.log(enabled);
            if (enabled === "true") {
                console.log("disabling");
                sites[window.location.href] = false;
                toggle.text("Enable");
            } else {
                console.log("enabling");
                sites[window.location.href] = true;
                toggle.text("Disable");
            }

            GM_setValue("enabledSites", sites);
            location.reload();
        });
    }

    function waitToLoad(selector) {
        var itemContainer = $(selector);
        waitForEl(itemContainer, waitToLoad, 1000, checkIfThereAreNewAds, selector);
    }

    function checkIfThereAreNewAds() {
        var firstItem = $(SEL_ITEMS).eq(0);
        var currId = firstItem.attr(AD_ID);
        var prevId = GM_getValue(AD_ID + siteId);

        if (typeof prevId === "undefined" || prevId === "") {
            GM_setValue(AD_ID + siteId, currId);
        } else if (typeof currId !== "undefined" && currId != prevId) {
            GM_setValue(AD_ID + siteId, currId);
            addAudioAndBeep();
        }

        initDelayedReload();
    }

    function addAudioAndBeep() {
        var audio = $("<audio/>", { style: "display:none;" });
        var src = $("<source/>", { src: BEEP_MP3 });
        audio.append(src);
        $("body").append(audio);
        setTimeout(beep, BEEP_INTERVAL, audio, BEEP_COUNT);
    }

    function beep(audio, beepCount) {
        audio.trigger("play");
        if (beepCount > 1) {
            console.log("beep");
            setTimeout(beep, BEEP_INTERVAL, audio, beepCount - 1);
        }
    }

    function initDelayedReload() {
        var retryInterval = randomInterval(RELOAD_INTERVAL_MIN * RELOAD_INTERVAL_UNIT_MULTIPLYER, RELOAD_INTERVAL_MAX * RELOAD_INTERVAL_UNIT_MULTIPLYER);
        var intervalInMajorUnits = Math.floor(retryInterval / RELOAD_INTERVAL_UNIT_MULTIPLYER);

        var display = $("<div/>", { style: RELOAD_COUNTER_STYLE });
        var timePrefix = $("<span/>", { html: "Reloading&nbsp;in&nbsp;" });
        var time = $("<span/>", { text: intervalInMajorUnits });
        var timePostfix = $("<span/>", { html: "&nbsp;" + RELOAD_INTERVAL_UNIT_NAME });
        display.append(timePrefix);
        display.append(time);
        display.append(timePostfix);
        $(SEL_LOGO).append(display);
        setTimeout(updateRetryTime, RELOAD_INTERVAL_UNIT_MULTIPLYER, time);
        setTimeout(function() { location.reload(); }, retryInterval);
    }

    function updateRetryTime(time) {
        var timeVal = time.text() - 1;
        time.text(timeVal);
        if (timeVal > 1) {
            setTimeout(updateRetryTime, RELOAD_INTERVAL_UNIT_MULTIPLYER, time);
        }
    }

    function waitForEl(el, waitTrigger, delay, elTrigger, selector) {
        if (el.length === 0) {
            setTimeout(waitTrigger, delay, selector);
        } else {
            elTrigger();
        }
    }

    function randomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})();