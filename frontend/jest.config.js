const config = {
    verbose: true,
    moduleNameMapper: {
        'pdfjs-dist/webpack': 'pdfjs-dist',
        "axios": "axios/dist/node/axios.cjs",
    }
};

module.exports = config;