const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

function getCategory(name) {
  return collection => {
    return collection
      .getAllSorted()
      .reverse()
      .filter(post => {
        if (post.data.categories) {
          return post.data.categories.includes(name);
        }
        return false;
      });
  };
}

module.exports = config => {
  config.addPlugin(pluginRSS);
  config.addPlugin(pluginSyntaxHighlight);
  config.addPassthroughCopy("css");
  config.addPassthroughCopy("js");
  config.setFrontMatterParsingOptions({
    excerpt: true
  });

  config.setLiquidOptions({
    dynamicPartials: true
  });

  config.addCollection("musings", getCategory("musing"));
  config.addCollection("faq", getCategory("faq"));
  config.addCollection("bio", getCategory("bio"));
  config.addCollection("projects", getCategory("project"));
  config.addCollection("empathy", getCategory("empathy"));

  return {
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  };
};
