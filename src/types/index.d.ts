export interface IObject {
  [key: string]: any
}
export type TLifeCycle =
  | 'init'
  | 'update'
  | 'onPropsUpdate'
  | 'onThemeUpdate'
  | 'onDataUpdate'
  | 'onLockUpdate'
  | 'onCardRowDataUpdate'
  | 'onGridRowDataUpdate'
  | 'handleDirective'
  | 'destoryed'

// 自定义控件props
export interface TCustomProps {
  cardRowData: IObject
  configItems: { key: string; value: string }[]
  data: IObject
  gridRowData: IObject
  lang: string
  lock: boolean
  themeColor: string
  themeNum: string
}

export interface TCustomModel {
  dom: ReactDOM.Container | null
  fileServer: string
  injectAttachData: () => void
  invoke: (eventName: string, eventArgs: any[]) => () => void
  invokeAsync: (eventName: string, eventArgs: any[]) => () => void
  invokeCustomMethod: (IObject) => (method: string, args: any[], isNoClearPostData: boolean) => void
  isvId: string
  key: string
  lang: string
  metaData: IObject
  moduleId: string
  pageId: string
  schemaId: string
  setPostData: (IObject) => void
  userDataReporting: (IObject) => void
}

export type TRegisterConfig = {
  isMulLang?: boolean
} & IObject

export interface TKDApi {
  getHTMLStringBytemplate: (tpl: string, data: IObject) => void
  getLangMsg: (model: TCustomModel, key: string, variables?: any) => void
  getNameSpace: (model: TCustomModel) => void
  getTemplateStringByFilePath: (filePatch: string, model: TCustomModel, data: IObject) => void
  loadFile: (filePatch: string, model: TCustomModel, callback?: () => void) => void
  nameSpace: (model: TCustomModel) => void
  register: (type: string, ctrl: (TCustomModel) => void, config?: TRegisterConfig) => void
  template: (tpl: string, data: IObject) => void
  templateFilePath: (filePatch: string, model: TCustomModel, data: IObject) => void
}

export interface IRoot {
  model?: TCustomModel
  customProps?: TCustomProps
}

export interface ComponentInstance {
  _setModel: (model: TCustomModel) => void
  model: TCustomModel
}
export type IThemeUpdateProps = Pick<TCustomProps, 'themeColor' | 'themeNum'>
export type IDataUpdateProps = Pick<TCustomProps, 'data'>
export type ILockUpdateProps = Pick<TCustomProps, 'lock'>
export type ICardRowDataUpdateProps = Pick<TCustomProps, 'cardRowData'>
export type IGridRowDataUpdateProps = Pick<TCustomProps, 'gridRowData'>
