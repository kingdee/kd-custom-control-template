module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '[data-control-name="${CONTROL_NAME}"]',
      exclude: [/^::/, /^:root/, /^\.kd-custom-exclude/], // 排除.kd-开头的clsss，排除:开头的浏览器标签, 排除以'kd-custom-exclude'开头的样式
      transform: function (prefix, selector, prefixedSelector) {
        return prefixedSelector
      },
    }),
  ],
}
