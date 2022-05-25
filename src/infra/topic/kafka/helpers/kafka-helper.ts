import { Kafka } from 'kafkajs'
import { ItemsModel } from '../../../../presentation/protocols'

export const KafkaHelper = {
  client: typeof Kafka,
  uri: null as string,
  producer: typeof Kafka,
  async connect(kafkaConfig: any): Promise<void> {
    this.uri = kafkaConfig.uri
    this.client = new Kafka({
      // clientId: kafkaConfig.consumer,
      brokers: [this.uri],
    })
  },

  async producerUpdateItem (topic: string, items: ItemsModel[]) {
    this.producer = this.client.producer()
    await this.producer.connect()
    const itemParsed = JSON.stringify(items)
    await this.producer.send({
      topic,
      messages: [{ value: itemParsed }]
    })

    console.log(`Messages sended successfully to Topic ${topic} Kafka`)
    console.log(itemParsed)
  }
}
