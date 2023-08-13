const fs = require("fs/promises");
const path = require("path");
const markdownIt = require("markdown-it");
const config = require("./project.config.js")


// This will change both Eleventy's pathPrefix, and the one output by the
// vite-related shortcodes below. Double-check if you change this, as this is only a demo :)
const PATH_PREFIX = config.PATH_PREFIX;
const TEMPLATE_ENGINE = config.TEMPLATE_ENGINE;

module.exports = function (eleventyConfig) {
  // Disable whitespace-as-code-indicator, which breaks a lot of markup
  const configuredMdLibrary = markdownIt({ html: true }).disable("code");
  eleventyConfig.setLibrary("md", configuredMdLibrary);

  eleventyConfig.addNunjucksGlobal('config', config);

  // ignores
  eleventyConfig.ignores.add(`${config.CLIENT_DIR}/*.js`);
  eleventyConfig.ignores.add(`${config.CLIENT_DIR}/*.css`);

  // Read Vite's manifest.json, and add script tags for the entry files
  // You could decide to do more things here, such as adding preload/prefetch tags
  // for dynamic segments
  // NOTE: There is some hard-coding going on here, with regard to the assetDir
  // and location of manifest.json
  // you could probably read vite.config.js and get that information directly
  // @see https://vitejs.dev/guide/backend-integration.html
  eleventyConfig.addNunjucksAsyncShortcode("viteScriptTag", viteScriptTag);
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLegacyScriptTag",
    viteLegacyScriptTag
  );
  eleventyConfig.addNunjucksAsyncShortcode(
    "viteLinkStylesheetTags",
    viteLinkStylesheetTags
  );

  async function viteScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script type="module" src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  async function viteLinkStylesheetTags(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    if (!entryChunk.css || entryChunk.css.length === 0) {
      console.warn(`No css found for ${entryFilename} entry. Is that correct?`);
      return "";
    }
    /* There can be multiple CSS files per entry, so assume many by default */
    return entryChunk.css
      .map((cssFile) => `<link rel="stylesheet" href="${PATH_PREFIX}${cssFile}"></link>`)
      .join("\n");
  }

  async function viteLegacyScriptTag(entryFilename) {
    const entryChunk = await getChunkInformationFor(entryFilename);
    return `<script nomodule src="${PATH_PREFIX}${entryChunk.file}"></script>`;
  }

  async function getChunkInformationFor(entryFilename) {
    // We want an entryFilename, because in practice you might have multiple entrypoints
    // This is similar to how you specify an entry in development more
    if (!entryFilename) {
      throw new Error(
        "You must specify an entryFilename, so that vite-script can find the correct file."
      );
    }

    // TODO: Consider caching this call, to avoid going to the filesystem every time
    const manifest = await fs.readFile(
      path.resolve(process.cwd(), config.DIST_DIR, config.MANIFEST)
    );
    const parsed = JSON.parse(manifest);

    let entryChunk = parsed[entryFilename];

    if (!entryChunk) {
      const possibleEntries = Object.values(parsed)
        .filter((chunk) => chunk.isEntry === true)
        .map((chunk) => `"${chunk.src}"`)
        .join(`, `);
      throw new Error(
        `No entry for ${entryFilename} found in ${config.DIST_DIR}/${config.MANIFEST}. Valid entries in manifest: ${possibleEntries}`
      );
    }

    return entryChunk;
  }

  return {
    templateFormats: ["md", TEMPLATE_ENGINE, "html"],
    pathPrefix: PATH_PREFIX,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    dataTemplateEngine: TEMPLATE_ENGINE,
    passthroughFileCopy: true,
    dir: {
      input: config.INPUT_CONTENT,
      output: config.OUTPUT_DIR,
      // NOTE: paths are relative to dir.input
      // @see https://github.com/11ty/eleventy/issues/232
      layouts: config.LAYOUTS,
      includes: config.INCLUDES,
      data: config.DATA_DIR,
    },
  };
};
