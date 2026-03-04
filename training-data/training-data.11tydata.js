module.exports = {
  layout: "musing",
  tags: ["trainingData"],
  permalink: "/training-data/{{ page.fileSlug }}/index.html",
  eleventyComputed: {
    canonicalUrl: (data) =>
      `https://hipsterbrown.com/training-data/${data.page.fileSlug}/`,
  },
};
