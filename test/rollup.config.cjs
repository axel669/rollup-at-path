const $path = require("../main.js")

module.exports = {
    input: "main.mjs",
    output: {
        file: "build/script.js",
        format: "iife",
    },
    plugins: [
        $path({
            root: ".",
            paths: {
                $func: "functions",
                $seed: "seed.mjs"
            }
        })
    ]
}
