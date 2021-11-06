/**
 * This script runs automatically after your first npm-install.
 */
const _prompt = require("prompt")
const { mv, rm, which, exec } = require("shelljs")
const path = require("path")
const { readFileSync, writeFileSync } = require("fs")
const { fork } = require("child_process")
const colors = require("colors")

// clean
process.stdout.write('\x1B[2J\x1B[0f');

/**需要移除的目录 */
const rmDirs = [
    ".git"
]/**需要移除的文件 */
const rmFiles = [
    ".all-contributorsrc",
    ".gitattributes",
    "tools/init.ts"
]/**需要合并的文件 */
const modifyFiles = [
    "LICENSE",
    "package.json",
    "rollup.config.ts",
    "test/library.test.ts",
    "tools/gh-pages-publish.ts"
]/**需要重命名的文件 */
const renameFiles = [
    ["src/library.ts", "src/--libraryname--.ts"],
    ["test/library.test.ts", "test/--libraryname--.test.ts"]
]

console.log('[node TS] 刚执行了 npm install 后自启动执行...');

let username = exec("git config user.name").stdout.trim()
let usermail = exec("git config user.email").stdout.trim()

// console.log(username, usermail);

// Remove post-install command
let jsonPackage = path.resolve(__dirname, "..", "package.json")
const pkg = JSON.parse(readFileSync(jsonPackage) as any)

// console.log(jsonPackage);
// console.log(pkg);

// Note: Add items to remove from the package file here
// delete pkg.scripts.postinstall

// writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2))
// console.log(colors.green("Postinstall script has been removed"))

// // Initialize Husky
// fork(
//     path.resolve(__dirname, "..", "node_modules", "husky", "bin", "install"), {
//         silent: true
//     }
// );
// console.log(colors.green("Git hooks set up"))

// console.log("\n")
_prompt.start()
_prompt.message = ""



/**
 * The library name is suggested by looking at the directory name of the
 * tools parent directory and converting it to kebab-case
 * 
 * The regex for this looks for any non-word or non-digit character, or
 * an underscore (as it's a word character), and replaces it with a dash.
 * Any leading or trailing dashes are then removed, before the string is
 * lowercased and returned
 */
function libraryNameSuggested() {
    return path
        .basename(path.resolve(__dirname, ".."))
        .replace(/[^\w\d]|_/g, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase()
}

const _promptSchemaLibrarySuggest = {
    properties: {
        useSuggestedName: {
            description: colors.cyan(
                'Would you like it to be called "' +
                libraryNameSuggested() +
                '"? [Yes/No]'
            ),
            pattern: /^(y(es)?|n(o)?)$/i,
            type: "string",
            required: true,
            message: 'You need to type "Yes" or "No" to continue...'
        }
    }
}

function libraryNameSuggestedAccept() {
    _prompt.get(_promptSchemaLibrarySuggest, (err: any, res: any) => {
        if (err) {
            console.log(colors.red("Sorry, you'll need to type the library name"))
            //TODO libraryNameCreate()
            console.log('err : TODO sth.');
        }



        if (res.useSuggestedName.toLowerCase().charAt(0) === "y") { // 输入 y/yes 
            // setupLibrary(libraryNameSuggested())
            console.log('yes.');
        } else { // 输入非 y/yes
            // libraryNameCreate()
            console.log('no.');
        }
    })
}


if (process.env.CI == null) {
    libraryNameSuggestedAccept()
}
