module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '[data-control-name="${CONTROL_NAME}"]',
      exclude: [/^\.el-/, /^::/, /^:root/, /^\.kd-custom-exculde/], // 排除.el-开头的clsss，排除:开头的浏览器标签, 排除以'kd-custom-exculde'开头的样式
      transform: function (prefix, selector, prefixedSelector) {
        return prefixedSelector
      },
    }),
  ],
}
