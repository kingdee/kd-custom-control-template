import { TLifeCycle, TCustomModel } from '@/types'
import postal from 'postal'

const pub = function (model: TCustomModel, topic: TLifeCycle, data: any) {
  const schemaId = model.schemaId
  const key = model.key
  const pageId = model.pageId
  postal.publish({
    channel: `${pageId}_${schemaId}_${key}`,
    topic: topic,
    data,
  })
}

const sub = function (model: TCustomModel, topic: TLifeCycle, callback: (data: any) => void) {
  const schemaId = model.schemaId
  const key = model.key
  const pageId = model.pageId
  const handler = postal.subscribe({
    channel: `${pageId}_${schemaId}_${key}`,
    topic: topic,
    callback,
  })
  return handler
}

const unsub = function (handler: any) {
  postal.unsubscribe(handler)
}

export default {
  pub,
  sub,
  unsub,
}
