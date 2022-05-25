export interface RequestItemsModel {
  requestItemsId: string
  documentClient?: string
  items: ItemsModel[]
  amountRequest: number
  lastUpdate?: Date
}

export interface ItemsModel {
  itemId: string
  name: string
  description?: string
  category?: string
  quantity: number
  unitaryValue: number
}
