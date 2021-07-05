const fetch = require('node-fetch');
const fs = require('fs')

async function main() {

    if(!fs.existsSync("scraped")) {
        fs.mkdirSync("scraped")
    }

    for(let id of iterateStrings()) {

        if(fs.existsSync("scraped/p1" + id + ".json")) {
            console.log("Already scraped " + id)
            continue
        }

        let link = "https://api.gettr.com/u/post/p1" + id + "?incl=poststats%7Cuserinfo"
                
        let res = await fetch(link)
        let json = await res.json()

        let status = json['result']['data']['nfound']
        let nfound = status !== undefined && status === true
        let found = !nfound

        console.log("(found=" + found + ") Scraped id " + id + " (" + link + ")")

        fs.writeFileSync("scraped/p1" + id + ".json", JSON.stringify(json))

    }

    console.log("DONE!")

}

function iterateStrings() {
    let strings = []
    let chars = validChars()
    for(let c1 of chars) {
        for(let c2 of chars) {
            for(let c3 of chars) {
                for(let c4 of chars) {
                    strings.push(c1+c2+c3+c4)
                }   
            }
        }
    }
    return strings
}

function validChars() {
    return [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
        "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
        "u", "v", "w", "x", "y", "z"
    ]
}

main()