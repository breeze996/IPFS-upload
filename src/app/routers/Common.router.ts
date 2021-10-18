import { Router } from 'express'
import * as validation from 'express-joi-validation'
import * as multer from 'multer'
import { CommonController } from '../components/Common'

const upload = multer()

export class CommonRouter {
  public router: Router
  protected commonController: CommonController
  protected validator: any

  constructor() {
    this.commonController = new CommonController()
    this.validator = validation({ passError: true })
    this.router = this.initRouter()
  }

  /**
   * Common router
   */
  private initRouter(): Router {
    const router: Router = Router()

    router.post('/uploadFileToIPFS', upload.single('file'), this.commonController.uploadFileToIPFS)

    router.post('/addJSONToIPFS', this.commonController.addJSONToIPFS)

    return router
  }
}

export const commonRouter = new CommonRouter()
