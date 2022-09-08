# Rollup $path

## Installation
```bash
yarn add @axel669/rollup-dollar-path
```

## Usage

```js
import $path from "@axel669/rollup-dollar-path"

module.exports = {
    input: "main.mjs",
    output: {
        file: "build/script.js",
        format: "iife",
    },
    plugins: [
        //  NOTE: All paths are relative to directory rollup is being run in
        $path({
            //  Root folder to resolve for "$/"
            root: ".",
            //  Optional mappings for naming common imports
            paths: {
                $func: "functions",
                $seed: "seed.mjs"
            },
            //  Optional extensions to check when resolving
            //  default: [".js", ".mjs", ".svelte", ".jsx"]
            extensions: [".js", ".mjs", ".cjs"]
        })
    ]
}

```
