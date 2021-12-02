import * as debug from 'debug'
import * as fs from 'fs'
import { fileToStream, getExtname, getInterimStoragePath, prefixIPFSHash } from '../../utils'
import { addFileToIPFS } from '../../utils/IPFS'
import { pinJSONToIPFS, pinFileToIPFS } from '../../utils/pinata'

const logger = debug('app:src/app/components/Common/Common.service.ts')

export class CommonService {
  public static async addFileToIPFS(file: Express.Multer.File) {
    try {
      const content = { path: file.path, content: file.buffer }
      const { cid, path } = await addFileToIPFS(content)
      const pinataPinResponse = await pinFileToIPFS(fileToStream(file, path))
      fs.unlinkSync(getInterimStoragePath(path, getExtname(file.originalname)))

      return { cid: cid.toString(), url: prefixIPFSHash(path), path, pinataPinResponse }
    } catch (err) {
      logger('addFileToIPFS:: error: ', err)
      throw err
    }
  }

  public static async addJSONToIPFS(data: any) {
    try {
      const content = Buffer.from(JSON.stringify(data ? data : {}))
      const { cid, path } = await addFileToIPFS({ content })
      const pinataPinResponse = await pinJSONToIPFS(data ? data : {})

      return { cid: cid.toString(), path, url: prefixIPFSHash(path), pinataPinResponse }
    } catch (err) {
      logger('addJSONToIPFS:: error: ', err)
      throw err
    }
  }
}
