# bilibiliVideoCache2Mp4
把b站缓存的视频转换成为mp4

首先需要安装ffmpeg，ffmpeg的下载地址是<code>https://ffmpeg.org/</code>,下载之后还需要配置环境变量，因为后续nodejs里面用到了shelljs。

如何使用的demo在index.ts里面
~~~javascript
import bilibiliVideoCache2Mp4 from "./utils"
const path = require("path")

bilibiliVideoCache2Mp4(path.join(__dirname, 'entry'), path.join(__dirname, 'output'))
~~~
bilibiliVideoCache2Mp4函数的第一个参数是需要转换的视频入口，第二个参数是转换之后的视频的出口
在entry文件夹里面我放了一个demo