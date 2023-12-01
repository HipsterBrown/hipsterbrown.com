const path = require("path");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const {
  createInlineCss,
} = require("eleventy-google-fonts/eleventy-google-fonts");
const esbuild = require("esbuild");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");
const pluginSvg = require("@jamshop/eleventy-plugin-svg");
const embedTwitter = require("eleventy-plugin-embed-twitter");

function getCategory(name) {
  return (collection) => {
    return collection
      .getAllSorted()
      .reverse()
      .filter((post) => {
        if (process.env.ELEVENTY_ENV === "production") return !post.data.draft;
        return true;
      })
      .filter((post) => {
        if (post.data.categories) {
          return post.data.categories.includes(name);
        }
        return false;
      });
  };
}

module.exports = (config) => {
  config.on("eleventy.after", () => {
    return esbuild.build({
      entryPoints: ["js/app.ts"],
      bundle: true,
      outdir: "_site/assets",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
    });
  });
  config.addPlugin(pluginRSS);
  config.addPlugin(pluginSyntaxHighlight);
  config.addPlugin(pluginSvg, {
    input: "svg/",
  });
  config.addPlugin(embedTwitter, {
    align: "center",
  });

  config.addLiquidShortcode("eleventyGoogleFonts", createInlineCss);

  config.addTemplateFormats("scss");
  config.addWatchTarget("./sass/");
  config.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function(input, inputPath) {
      const compiler = postcss([
        postcssImport(),
        postcssPresetEnv({ stage: 0 }),
        process.env.ELEVENTY_ENV === 'production' && cssnano()
      ].filter(Boolean))
      const result = await compiler.process(input, {
        from: inputPath,
        parser: require("postcss-scss")
      })
      return async () => result.css;
    },
  });
  config.addWatchTarget("./js/");
  config.addPassthroughCopy("js");
  config.addPassthroughCopy("css");
  config.addPassthroughCopy("images");
  config.addPassthroughCopy("videos");
  config.addPassthroughCopy("admin/config.yml");
  config.setFrontMatterParsingOptions({
    excerpt: true,
  });

  config.setLiquidOptions({
    dynamicPartials: true,
  });

  config.addCollection("musings", getCategory("musing"));
  config.addCollection("faq", getCategory("faq"));
  config.addCollection("bio", getCategory("bio"));
  config.addCollection("projects", getCategory("project"));
  config.addCollection("empathy", getCategory("empathy"));

  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
