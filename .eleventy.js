const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const {
  createInlineCss,
} = require("eleventy-google-fonts/eleventy-google-fonts");
const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
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
  config.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["sass/app.scss", "js/app.ts"],
      bundle: true,
      outdir: "_site/assets",
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
      plugins: [sassPlugin()],
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

  config.addWatchTarget("./sass/");
  config.addWatchTarget("./js/");
  config.addPassthroughCopy("css");
  config.addPassthroughCopy("images");
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
