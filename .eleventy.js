const moment = require("moment");

moment.locale("en");

module.exports = function (eleventyConfig) {
    eleventyConfig.addFilter("dateIso", (date) => {
        return moment(date).toISOString();
    });

    eleventyConfig.addFilter("dateReadable", (date) => {
        return moment(date).utc().format("LL"); // E.g. May 31, 2019
    });

    eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

    return {
        dir: {
            input: "src",
            output: "dist",
	          includes: '_includes',
        },
        markdownTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md", "css", "js", "mjs", "png", "svg", "ico"],
    };
};

function extractExcerpt(article) {
    if (!article.hasOwnProperty("templateContent")) {
        console.warn('Failed to extract excerpt: Document has no property "templateContent".');
        return null;
    }

    let excerpt = null;
    const content = article.templateContent;

    // The start and end separators to try and match to extract the excerpt
    const separatorsList = [
        { start: "<!-- excerpt start -->", end: "<!-- excerpt end -->" },
        { start: "<p>", end: "</p>" },
    ];

    separatorsList.some((separators) => {
        const startPosition = content.indexOf(separators.start);
        const endPosition = content.indexOf(separators.end);

        if (startPosition !== -1 && endPosition !== -1) {
            excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
            return true; // Exit out of array loop on first match
        }
    });

    return excerpt;
}
