{{  Created by Pete Savva @ Tech & Tribal }}
{{  https://techandtribal.com             }}
{{  For collabs / consulting / coffee...  }}
{{  p.savva@protonmail.ch                 }}
{{  Twitter @techandtribal                }}
{{  Discord @techandtribal                }}
............................................

# BASICS
*  Experimental package to enable reuse of components across projects without having to copy and paste.
*  This keeps all of your projects using the same versions.


# updates
-  version 1.0 - many more functions being imported this week.
-  Including full CSS grid generation with React and Styled Components.
-  Had issues with linting due to document in eslint, due to lack of a DOM. Fixed with `/* eslint-env browser */ `
-  I highly recommend trying the Logging tool `import { Log } from "ariana/main"` - it makes the console much more attractive for debugging.


# usage

1)  Run `npm install` to install Ariana.
2)  Run `npm run build` as per [package.json] to generate a [main.js] file in the project directory.
3)  You can then import from [main.js] in other projects.
4)  For example `import { SASS } from "../../ariana/main"`


# structure

-  [src] folder contains various helper classes
-  Modules are organised, imported, and re-exported as named by [src/index.js]
-  Optionally keep the [package.json] `eslint:config` as I've optimised it to catch nasty bugs that might come up later on.

