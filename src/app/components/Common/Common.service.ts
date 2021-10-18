import * as debug from 'debug'
import { addFileToIPFS } from '../../utils/index'

const logger = debug('app:src/app/components/Common/Common.service.ts')

export class CommonService {
  public static async addFileToIPFS(file: Express.Multer.File) {
    try {
      const { cid, path } = await addFileToIPFS({ path: file.path, content: file.buffer })

      return { cid: cid.toString(), path }
    } catch (err) {
      logger('addFileToIPFS:: error: ', err)
      throw err
    }
  }

  public static async addJSONToIPFS(data: any) {
    try {
      const { cid, path } = await addFileToIPFS({
        content: Buffer.from(JSON.stringify(!data ? {} : data)),
      })

      return { cid: cid.toString(), path }
    } catch (err) {
      logger('addJSONToIPFS:: error: ', err)
      throw err
    }
  }
}
