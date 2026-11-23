const path = require('path');

const nextConfig = {
  async headers() { return [{source:"/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"},{key:"X-Frame-Options",value:"DENY"},{key:"X-Content-Type-Options",value:"nosniff"}]},{source:"/api/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"}]}]; },
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
