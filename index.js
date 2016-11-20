/*
    Dash Hue: Control your Hue installation with your Amazon Dash button
    Author: Michael Vieira (@Themimitoof) <contact[at]mvieira[dot]fr>
    Version: 1.0

    Licence:
    The MIT License (MIT)
    Copyright (c) 2016 Michael Vieira

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Import all librairies
var os          = require("os");
var dash_btn    = require("node-dash-button");
var hue         = require("node-hue-api");
var HueApi      = hue.HueApi;

// Configuration of Dash button and Hue API
var dash        = dash_btn(["50:f5:da:f7:31:d5"]);              // Put here the Dash Button MAC Address (if you don't know, use the "searchDash" command)
var hue_host    = "192.168.1.1";                                // Put here the Hue bridge IP
var hue_user    = "";                                           // Put here the Hue user (if you don't have user token, make one with the "newUser" command)
var hue_group   = 1;                                            // Put here the group id (if you don't know, use the "getGroups" command)
var api         = new HueApi(hue_host, hue_user);

var exec_code   = 1;                                            // This var determine if the code is executed or not.
var on          = false;
var lightState  = hue.lightState;
var state       = lightState.create();


// Message on Boot
console.log("Dash Hue: Control your Hue installation with your Amazon Dash button\nAuthor: Michael Vieira (@Themimitoof) <contact[at]mvieira[dot]fr>\nVersion: 1.0\n");

// displayResults function
var displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

/************
   Commands
************/

// Search all Dash buttons
if(process.argv[1] == "searchDash" || process.argv[2] == "searchDash") {
    exec_code = 0;

    console.log("Dash button search (Tape Ctrl+C to exit)");

    dash.on("detected", function (dash_id){
        console.log("Dash button found: " + dash_id);
    });

}

// Create new Hue User
if(process.argv[1] == "newUser" || process.argv[2] == "newUser") {
    console.log("Create new user on Hue bridge");

    var displayUserResult = function(result) {
        console.log("Created user: " + JSON.stringify(result));
        process.exit(1);
    };

    var displayError = function(err) {
        console.log(err);
        process.exit(1);
    };

    api.registerUser(hue_host, null, "Dash_Hue@" + os.hostname()).then(displayUserResult).fail(displayError).done();

}


// Get all groups from the Hue bridge with the "getGroups" command
if(process.argv[1] == "getGroups" || process.argv[2] == "getGroups") {
    console.log("All groups: ");

    api.groups(function(err, result) {
        if (err) throw err;
        displayResults(result);

        process.exit(1);
    });
}



/**********
    Code
***********/
// Dash push detection
if(exec_code == 1){
    dash.on("detected", function (dash_id){
        console.log("Dash button detected: " + dash_id);

        // Changing the light state
        if (!on)
            api.setGroupLightState(hue_group, state.on()).then(console.log("Change state to " + !on)).done();
        else
            api.setGroupLightState(hue_group, state.off()).then(console.log("Change state to " + !on)).done();

        on = !on;
    });
}
