import { boot } from 'quasar/wrappers'
import getError from "../utils/helper"
export default boot(({ app }) => {
    app.config.globalProperties.$apiResponse = getError
});