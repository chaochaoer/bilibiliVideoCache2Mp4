import fs from "fs"
import path from "path"
import shell from "shelljs"

type BilibiliVideoCache2Mp4 = (options: {
  curDirPath: string,      // 当前递归目录位置 
  isTarget?: boolean,      // 是否找到了需要转换成mp4的目标文件夹
  outputFileName?: string, // 转换成mp4的视频名
  dir?: string             // 整个视频合集文件夹的名字
}) => void

const mkdirSync = (targetPath: string) => {
  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath)
}

const bilibiliVideoCache2Mp4Wrap = (entry: string, output: string) => {
  mkdirSync(output)
  const bilibiliVideoCache2Mp4: BilibiliVideoCache2Mp4 = ({ curDirPath, isTarget, outputFileName, dir }) => {
    if (isTarget) {
      // 使用replaceAll去除空格不然ffmpeg会报错(eg:Unable to find a suitable output format for 'XXX')
      let targetPath = `${output}/${dir}`.replaceAll(' ', '')
      mkdirSync(targetPath)
      outputFileName = outputFileName?.replaceAll(' ', '')
      shell.exec(`ffmpeg -i ${curDirPath}\\video.m4s -i ${curDirPath}\\audio.m4s -codec copy ${targetPath}/${outputFileName}.mp4`)
      return
    }
    let files = fs.readdirSync(curDirPath);
    files.forEach(function (file: string) {
      let stat = fs.statSync(curDirPath + '/' + file)
      if (stat.isDirectory()) {
        if (file === '64') {
          let json = JSON.parse(fs.readFileSync(path.join(curDirPath, 'entry.json'), 'utf-8'))
          bilibiliVideoCache2Mp4({ curDirPath: path.join(curDirPath, file), isTarget: true, outputFileName: json.page_data.part, dir: json.title })
        }
        else bilibiliVideoCache2Mp4({ curDirPath: path.join(curDirPath, file) })
      }
    });
  }
  bilibiliVideoCache2Mp4({
    curDirPath: entry
  })
}

export default bilibiliVideoCache2Mp4Wrap
