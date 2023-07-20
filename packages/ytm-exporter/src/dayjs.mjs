import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat'

dayjs.locale('ja')
dayjs.extend(LocalizedFormat)

export default dayjs
