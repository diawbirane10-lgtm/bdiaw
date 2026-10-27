const path = require('path');

const nextConfig = {
  async redirects() {
    return ["about", "projects", "research", "experience", "contact"].map(section => ({
      source: "/" + section,
      destination: "/#" + section,
      permanent: false,
    }));
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
