import "module-alias/register";
import { addAliases } from "module-alias";

addAliases({
  "@app": `${__dirname}/app`,
  "@container": `${__dirname}/container`,
  "@core": `${__dirname}/core`,
  "@infrastructure": `${__dirname}/infrastructure`,
  "@libs": `${__dirname}/libs`,
});
