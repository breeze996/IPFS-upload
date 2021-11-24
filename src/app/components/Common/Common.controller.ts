import * as debug from 'debug'
import { Request, Response, NextFunction } from 'express-serve-static-core'
import { CommonService } from './Common.service'

const logger = debug('app:src/app/components/Common/Common.controller.ts')

/**
 *  `Common` controller
 */
export class CommonController {
  /**
   * POST upload file to ipfs
   * POST /api/common/uploadFileToIPFS
   */
  public uploadFileToIPFS = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw Error('unkonw file')
      }

      const data = await CommonService.addFileToIPFS(req.file)
      res.status(200).json({ data })
    } catch (err) {
      logger('uploadFileToIPFS:: error: ', err)
      next(err)
    }
  }
  /**
   * POST upload JSON data to ipfs
   * POST /api/common/addJSONToIPFS
   */
  public addJSONToIPFS = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await CommonService.addJSONToIPFS(req.body)
      res.status(200).json({ data })
    } catch (err) {
      logger('addJSONToIPFS:: error: ', err)
      next(err)
    }
  }
}
