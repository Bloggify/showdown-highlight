import type { ShowdownExtension } from "showdown";

declare function showdownHighlight({
  pre: Boolean = false,
}): ShowdownExtension[];
export = showdownHighlight;
