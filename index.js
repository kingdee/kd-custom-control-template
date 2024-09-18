/**
 *  自定义控件书写模板
 */
;(function (KDApi, $) {
  // 构造函数，变量名随意，与最后一句代码的KDApi.register的第二个参数一致即可
  function HelloWorld(model) {
    this._setModel(model)
  }

  // 原型中封装生命周期函数，固定格式
  HelloWorld.prototype = {
    _setModel: function (model) {
      this.model = model
    },
    init: function (props) {
      // TO DO
      initFunc(this.model, props)
    },

    onPropsUpdate: function (props) {
      // 任意props数据变更时触发
      console.log('-----onPropsUpdate', this.model, props)
    },

    onThemeUpdate: function (props) {
      // 主题变更时触发
      console.log('-----onThemeUpdate', this.model, props)
    },

    onDataUpdate: function (props) {
      // 控件数据变更时触发
      console.log('-----onDataUpdate', this.model, props)
    },

    onDataUpdate: function (props) {
      // 控件数据变更时触发
      console.log('-----onDataUpdate', this.model, props)
    },

    onLockUpdate: function (props) {
      // 控件锁定性变更时触发
      console.log('-----onLockUpdate', this.model, props)
    },

    // onCardRowDataUpdate: function (props) {
    //   // 卡片行数据变更时触发
    //   console.log('-----onCardRowDataUpdate', this.model, props)
    // },

    // onGridRowDataUpdate: function (props) {
    //   // 单据体行数据变更时触发
    //   console.log('-----onGridRowDataUpdate', this.model, props)
    // },

    handleDirective: function (customProp, methodname, args) {
      // 这里的methodname 对应的是指令发过来定义的methodname，可根据方法名拿到对应的参数args
      console.log(customProps, methodname, args)
    },

    destoryed: function () {
      console.log('-----destoryed', this.model)
    },
  }

  // Other Code
  var initFunc = function (model, props) {
    model.dom.innerHTML = 'init: Hello World!'
  }

  // 你只需知道第一个参数是你接下来要新增控件方案时填的方案id，第二个参数是上面声明的构造函数
  KDApi.register('${CONTROL_NAME}', HelloWorld)
})(window.KDApi, jQuery) // 这里的jQuery不是必须要传进去的，可移除，要用到的时候才传，PC端系统默认会有jQuery对象，版本是1.12.4
