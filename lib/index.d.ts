import type { ShowdownExtension } from "showdown";

declare function showdownHighlight({ pre: Boolean }): ShowdownExtension[];
export = showdownHighlight;
