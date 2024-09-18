import { Button } from '@kdcloudjs/kdesign'
import styles from './App.less'

const App = (props: any) => {
  return (
    <div className={styles.rect}>
      <h1>React自定义控件</h1>
      <Button type="primary">primary Button</Button>
    </div>
  )
}

export default App
