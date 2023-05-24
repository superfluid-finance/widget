import "@superfluid-finance/widget/webcomponent";
import tokenList from "@superfluid-finance/tokenlist";
import widgetProps from "./widgetProps.json";

window.addEventListener("DOMContentLoaded", () => {
  console.log(tokenList, widgetProps);

  const component = document.createElement("superfluid-widget");

  component.setAttribute(
    "productDetails",
    JSON.stringify(widgetProps.productDetails)
  );
  component.setAttribute(
    "paymentDetails",
    JSON.stringify(widgetProps.paymentDetails)
  );
  component.setAttribute("tokenList", JSON.stringify(tokenList));
  component.setAttribute("theme", JSON.stringify(widgetProps.theme));
  component.setAttribute("type", widgetProps.layout);

  component.setAttribute("trigger", "#trigger");

  const container = document.querySelector("body");
  container.appendChild(component);
});
