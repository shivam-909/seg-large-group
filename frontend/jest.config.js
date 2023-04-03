const config = {
    verbose: true,
    moduleNameMapper: {
        "react-pdf/dist/esm/entry.webpack": "react-pdf",
        // 'pdfjs-dist/webpack': 'pdfjs-dist',
        "axios": "axios/dist/node/axios.cjs",
    }
};

module.exports = config;