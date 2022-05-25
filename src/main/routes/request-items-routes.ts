import { Router } from 'express'
import { makeAddRequestItems } from '../factories/add-request-items'
import { adaptRoute } from '../adapters/request-items'

export default (router: Router): void => {
  router.post('/request-items', adaptRoute(makeAddRequestItems()))
}
