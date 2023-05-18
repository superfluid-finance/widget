import "superfluid-checkout-widget"
import tokenList from "./src/assets/tokenList.json"
import widgetProps from './src/assets/widgetProps'

window.tokenList = tokenList
window.widgetProps = widgetProps

window.addEventListener('DOMContentLoaded', () => {
    console.log(tokenList, widgetProps)
})