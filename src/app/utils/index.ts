import * as appRoot from 'app-root-path'
import * as path from 'path'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

export const interimStoragePath = path.resolve(appRoot.path, '/uploads/')

export function prefixIPFSHash(hash: string) {
  return `ipfs://${hash}`
}

export function getExtname(filename: string) {
  return path.extname(filename)
}

export function getInterimStoragePath(filePath: string, extname: string) {
  return path.resolve(interimStoragePath, filePath + extname)
}

export function fileToStream(file: Express.Multer.File, cid: string) {
  const filePath = getInterimStoragePath(cid, getExtname(file.originalname))
  mkdirp.sync(interimStoragePath)
  fs.writeFileSync(filePath, file.buffer, {})

  return fs.createReadStream(filePath)
}

export const handleError = (error: any) => {
  if (
    error &&
    error.response &&
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    return error.response.data.error
  } else if (error.data && error.data.error) {
    return error.data.error
  } else if (error.response && error.response.error) {
    return error.response.error
  }
  return error
}
