import { createDocumentation } from "typedoc-nextra";

await createDocumentation({
  // use existing typedoc json output (leave it blank to auto generate)
  jsonInputPath: `${__dirname}/data.json`,
  // output  location
  output: `${__dirname}/pages/api`,
  // output markdown
  markdown: true,
});
