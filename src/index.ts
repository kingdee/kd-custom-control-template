import { createApp, h } from 'vue'
import Index from '@/components/Index.vue'
import eventBus from '@/utils/eventBus'
import {
  TCustomProps,
  TCustomModel,
  TKDApi,
  IThemeUpdateProps,
  IDataUpdateProps,
  ILockUpdateProps,
  ComponentInstance,
} from '@/types'

declare global {
  interface Window {
    KDApi: TKDApi
  }
}

;(function (KDApi: TKDApi) {
  function MyComponent(this: ComponentInstance, model: TCustomModel) {
    this._setModel(model)
  }

  MyComponent.prototype = {
    _setModel: function (model: TCustomModel) {
      this.model = model
    },

    init: function (this: ComponentInstance, props: TCustomProps) {
      console.log('-----init', this.model, props)
      setHtml(this.model, props)
    },

    update: function (this: ComponentInstance, props: TCustomProps) {
      // 任意props数据变更时触发
      console.log('-----update', this.model, props)
      eventBus.pub(this.model, 'update', props)
    },

    handleDirective: function (
      customProps: TCustomProps,
      methodname: string,
      args: any[]
    ) {
      // 这里的methodname 对应的是指令发过来定义的methodname，可根据方法名拿到对应的参数args
      console.log(customProps, methodname, args)
    },

    destoryed: function () {
      console.log('-----destoryed', this.model)
    },

    // 以下生命周期在V7.0.1+版本支持

    // onPropsUpdate: function (this: ComponentInstance, props: TCustomProps) {
    //   // 任意props数据变更时触发
    //   console.log('-----onPropsUpdate', this.model, props)
    //   eventBus.pub(this.model, 'onPropsUpdate', props)
    // },

    // onThemeUpdate: function (
    //   this: ComponentInstance,
    //   props: IThemeUpdateProps
    // ) {
    //   // 主题变更时触发
    //   console.log('-----onThemeUpdate', this.model, props)
    //   eventBus.pub(this.model, 'onThemeUpdate', props)
    // },

    // onDataUpdate: function (this: ComponentInstance, props: IDataUpdateProps) {
    //   // 控件数据变更时触发
    //   console.log('-----onDataUpdate', this.model, props)
    //   eventBus.pub(this.model, 'onDataUpdate', props)
    // },

    // onLockUpdate: function (this: ComponentInstance, props: ILockUpdateProps) {
    //   // 控件锁定性变更时触发
    //   console.log('-----onLockUpdate', this.model, props)
    //   eventBus.pub(this.model, 'onLockUpdate', props)
    // },

    // onCardRowDataUpdate: function (this: ComponentInstance, props: ICardRowDataUpdateProps) {
    //   // 卡片行数据变更时触发
    //   console.log('-----onCardRowDataUpdate', this.model, props)
    // },

    // onGridRowDataUpdate: function (this: ComponentInstance, props: IGridRowDataUpdateProps) {
    //   // 单据体行数据变更时触发
    //   console.log('-----onGridRowDataUpdate', this.model, props)
    // },

  }

  const setHtml = (model: TCustomModel, customProps: TCustomProps) => {
    KDApi.loadFile('./css/index.css', model, () => {
      const app = createApp({
        data() {
          return {
            updateSub: null as any,
            newCustomProps: customProps,
          }
        },
        render() {
          return h(Index, {
            props: { ...this.newCustomProps },
          })
        },
        created() {
          this.updateSub = eventBus.sub(
            model!,
            'update',
            (updateProps: any) => {
              this.newCustomProps = updateProps
            }
          )
        },
        beforeUnmount() {
          if (this.updateSub) {
            eventBus.unsub(this.updateSub)
          }
        },
      })

      app.mount(model.dom)
    })
  }

  // 注册自定义组件
  KDApi.register('${CONTROL_NAME}', MyComponent)
})(window.KDApi)
