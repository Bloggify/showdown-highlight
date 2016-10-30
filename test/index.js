"use strict";

const tester = require("tester")
    , showdownHighlight = require("..")
    ;

tester.describe("showdown-highlight", t => {
    t.should("A Showdown extension for highlight the code blocks.", () => {
        t.except(showdownHighlight()).toEqual(/*...*/);
    });
});