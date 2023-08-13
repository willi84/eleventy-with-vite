const BASE = 'src';
const RELATIVE_BASE = './..';
const INPUT_CONTENT = `${BASE}/content`;
const OUTPUT_DIR = "_site";
const CLIENT_DIR = `${BASE}/client`;
const PATH_PREFIX = '/';
const DIST_DIR = '_site';
const MANIFEST = 'manifest.json';
const TEMPLATES = `${RELATIVE_BASE}/templates`;
const INCLUDES = `${TEMPLATES}/_includes`;
const LAYOUTS = TEMPLATES;
const DATA_DIR = `${RELATIVE_BASE}/_data`;
const ENTRY_FILE = `${CLIENT_DIR}/main.ts`;
const TEMPLATE_ENGINE = 'njk';
const HOSTNAME_DEV = 'localhost';
const PORT_VITE = 3000;
const HOST_VITE = `http://${HOSTNAME_DEV}:${PORT_VITE}`;

module.exports = {
    OUTPUT_DIR: OUTPUT_DIR,
    CLIENT_DIR: CLIENT_DIR,
    PATH_PREFIX: PATH_PREFIX,
    DIST_DIR: DIST_DIR,
    MANIFEST: MANIFEST,
    INCLUDES: INCLUDES,
    DATA_DIR: DATA_DIR,
    ENTRY_FILE: ENTRY_FILE,
    TEMPLATE_ENGINE: TEMPLATE_ENGINE,
    HOSTNAME_DEV: HOSTNAME_DEV,
    PORT_VITE: PORT_VITE,
    HOST_VITE: HOST_VITE,
    INPUT_CONTENT: INPUT_CONTENT,
    LAYOUTS: LAYOUTS
}