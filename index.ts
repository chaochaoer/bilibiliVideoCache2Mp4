import bilibiliVideoCache2Mp4 from "./utils"
const path = require("path")

bilibiliVideoCache2Mp4(path.join(__dirname, 'entry'), path.join(__dirname, 'output'))