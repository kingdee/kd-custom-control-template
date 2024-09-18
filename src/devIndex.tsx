/**
 * 该文件用于开发环境实时预览效果，但无法和后端通信
 */

import ReactDOM from 'react-dom'
import App from '@/components/App'

ReactDOM.render(
  <>
    <div data-control-name="${CONTROL_NAME}">
      <App />
    </div>
  </>,
  document.getElementById('root') as HTMLElement
)
