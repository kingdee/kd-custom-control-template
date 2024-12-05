/**
 * 该文件用于打包发布时
 * 在setHtml中声明Root组件，使用ReactDOM.render将其渲染在model.dom中
 * 在Root组件的useEffect里，声明一个订阅，用于接收后端更新发过来的消息，从而去更新组件
 * 在onPropsUpdate里，发布一个消息，当后端插件给自定义控件传递新数据时，就能将消息发布给Root
 * 在Root组件的useEffect的reture里，取消订阅
 * 在destoryed里，使用ReactDOM.unmountComponentAtNode卸载Root
 */

import ReactDOM from 'react-dom'
import App from '@/components/App'
import '@kdcloudjs/kdesign/dist/kdesign.css'
import eventBus from '@/utils/eventBus'
import {
  IRoot,
  TCustomProps,
  TCustomModel,
  TKDApi,
  IThemeUpdateProps,
  IDataUpdateProps,
  ILockUpdateProps,
  ComponentInstance,
} from '@/types'
import { useEffect, useState } from 'react'

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

    handleDirective: function (customProps: TCustomProps, methodname: string, args: any[]) {
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

    // onThemeUpdate: function (this: ComponentInstance, props: IThemeUpdateProps) {
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

  var setHtml = function (model: TCustomModel, customProps: TCustomProps) {
    KDApi.loadFile('./css/index.css', model, () => {
      const Root = (props: IRoot) => {
        const { model, customProps } = props
        const [newCustomProps, setNewCustomProps] = useState(customProps)
        useEffect(() => {
          const updateSub = eventBus.sub(model!, 'update', (updateProps: any) => {
            setNewCustomProps(updateProps)
          })
          return () => {
            eventBus.unsub(updateSub)
          }
        }, [])
        return (
          <div data-control-name="${CONTROL_NAME}">
            <App model={model} customProps={newCustomProps} />
          </div>
        )
      }
      ReactDOM.render(<Root model={model} customProps={customProps} />, model.dom)
    })
  }

  // 注册自定义组件
  KDApi.register('${CONTROL_NAME}', MyComponent)
})(window.KDApi)
