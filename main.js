const path = require("path")
const fs = require("fs")

const basePath = path.resolve(process.cwd(), "src")
const $path = (opt) => {
    const {
        root,
        paths = {},
        extensions = [".js", ".mjs", ".svelte", ".jsx"]
    } = opt

    if (root === undefined) {
        throw new Error("Root folder not defined")
    }

    const prefixes = Object.keys(paths)

    for (const prefix of prefixes) {
        if (/^\$[\w\-\d]+/.test(prefix) === false) {
            throw new Error(`Prefix "${prefix}" is not formatted correctly`)
        }
    }

    const mapping = { ...paths, "$": root }

    const matchPrefix = (id) => {
        if (id.startsWith("$/") === true) {
            return "$"
        }
        const prefix = prefixes.find(
            (prefix) => id.startsWith(`${prefix}/`) === true
        )
        return prefix
    }
    return {
        resolveId: (id) => {
            const prefix = matchPrefix(id)

            if (prefix === undefined) {
                return undefined
            }
            const filePath = path.resolve(
                basePath,
                id.slice(prefix.length + 1)
            )

            if (path.extname(filePath) !== "") {
                return filePath
            }

            for (const ext of extensions) {
                const check = `${filePath}${ext}`
                if (fs.existsSync(check) === true) {
                    return check
                }
            }

            return undefined
        }
    }
}

module.exports = $path
