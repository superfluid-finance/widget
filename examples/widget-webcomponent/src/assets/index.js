import "superfluid-checkout-widget/dist/src/WebComponent.js"
import tokenList from "./tokenList.json"
import widgetProps from './widgetProps'


window.addEventListener('DOMContentLoaded', () => {
    console.log(tokenList, widgetProps)

    const component = document.createElement("superfluid-widget");

    component.setAttribute(
      "productDetails",
      JSON.stringify(widgetProps.productDetails)
    );
    component.setAttribute(
      "paymentDetails",
      JSON.stringify(widgetProps.paymentDetails)
    );
    component.setAttribute(
      "tokenList",
      JSON.stringify(tokenList)
    );
    component.setAttribute(
      "theme",
      JSON.stringify(widgetProps.theme)
    );
    component.setAttribute("type", widgetProps.layout);

    const container = document.querySelector("body");
    container.appendChild(component);
})