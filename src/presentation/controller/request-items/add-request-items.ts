import { HttpRequest, HttpResponse, Controller, AddRequestItems } from './request-items-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class AddRequestItemsController implements Controller {
  private readonly addRequestItem: AddRequestItems
  constructor (addItem: AddRequestItems) {
    this.addRequestItem = addItem
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredFields = [
        'documentClient',
        'items',
        ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {
        documentClient,
        items,
        amountRequest,
        
      } = httpRequest.body

      const item = await this.addRequestItem.add({
        documentClient,
        items,
        amountRequest,
      })
      return ok(item)
    } catch (error) {
      return serverError()
    }
  }
}