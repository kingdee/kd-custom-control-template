'use strict'

const { defineConfig } = require('eslint/config')
const kingdeeKwcConfig = require('@kdcloudjs/eslint-config-kwc/recommended')

module.exports = defineConfig([
  {
    files: ['src/**/*.js'],
    extends: [kingdeeKwcConfig],
    rules: {
      'jest/no-deprecated-functions': 'off',
      'semi': ['error', 'always'], // 强制使用分号
      'indent': [
          2,
          4,
          { SwitchCase: 1 } // switch 语句中的 case 分支使用 1 个空格缩进
      ],
      'no-multi-spaces': 2, // 不允许多个连续的空格
      'space-unary-ops': [2, { words: true, nonwords: false }], // 一元运算符后必须有空格
      'space-before-blocks': [2, 'always'], // 代码块前必须有空格
      'no-mixed-spaces-and-tabs': 2, // 不允许混合使用空格和制表符
      'no-multiple-empty-lines': [2, { max: 1 }], // 连续空行不超过 1 行
      'no-trailing-spaces': 2, // 行尾不允许有空格
      'no-whitespace-before-property': 2, // 属性名和点运算符之间不能有空格
      'no-irregular-whitespace': 2, // 不允许出现不规则的空白字符
      'space-in-parens': [1, 'never'], // 圆括号内不能有空格
      'comma-dangle': [1, 'never'], // 逗号不允许有拖尾
      'max-len': ['error', { code: 200 }], // 行宽最大为 200 字符
      'operator-linebreak': [2, 'before'], // 运算符换行时，运算符在行首
      'comma-style': [2, 'last'], // 逗号风格：换行时在行尾
      'no-extra-semi': 2, // 不允许出现多余的分号
      'curly': [2, 'all'], // 使用大括号包裹所有控制结构
      'key-spacing': [2, { beforeColon: false, afterColon: true }], // 属性名与冒号之间不能有空格，冒号后必须有空格
      'comma-spacing': [1, { before: false, after: true }], // 逗号后必须有空格
      'spaced-comment': [1, 'always'], // 注释后必须有空格
      'eqeqeq': [2, 'always', { null: 'ignore' }], // 强制使用全等 (===) 运算符
      'no-else-return': [1, { allowElseIf: false }], // 禁止 else 语句，如果 if 语句中已返回值
      'no-loop-func': 2, // 禁止在循环中定义函数
      'no-implicit-coercion': [1, { allow: ['!!'] }], // 禁止隐式类型转换
      'quotes': [2, 'single'], // 强制使用单引号
      'max-params': [1, 6], // 函数参数最大数量为 6
      'no-eval': 2, // 禁止使用 eval
      'prefer-const': 2, // 建议使用 const 声明不变的变量
      'no-var': 2, // 建议使用 let/const 替代 var
      'prefer-destructuring': [
          1,
          { object: true, array: false } // 建议使用解构赋值
      ],
      'prefer-template': 1, // 建议使用模板字符串
      'no-duplicate-imports': 2, // 禁止重复导入
      'no-unused-vars': 1, // 出现未使用的变量
      'radix': 1 // 解析整数时必须使用基数
    }
  }
])