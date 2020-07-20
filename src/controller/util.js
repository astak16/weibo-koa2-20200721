const {ErrorModel, SuccessModel} = require('../model/ResModel')
const {uploadFileSizeFailInfo} = require('../model/ErrorInfo')
const fse = require('fs-extra')
const path = require('path')

const DIST_FOLDER_Path = path.join(__dirname, '..', '..', 'uploadFiles')
const MIX_SIZE = 1024 * 1024 * 1024
fse.pathExists(DIST_FOLDER_Path).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_Path)
  }
})

const saveFile = async ({type, name, size, filePath}) => {
  if (size > MIX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  const fileName = Date.now() + '.' + name
  const distFilePath = path.join(DIST_FOLDER_Path, fileName)
  await fse.move(filePath, distFilePath)
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}
