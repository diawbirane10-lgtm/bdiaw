const path = require('path');

const nextConfig = {
  async headers() { return [{source:"/:path*",headers:[{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"Permissions-Policy",value:"geolocation=(), camera=(), microphone=()"}]},{source:"/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"},{key:"X-Frame-Options",value:"DENY"},{key:"Content-Security-Policy",value:"frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'"},{key:"X-Content-Type-Options",value:"nosniff"}]},{source:"/api/admin/:path*",headers:[{key:"Cache-Control",value:"private, no-store"},{key:"X-Robots-Tag",value:"noindex, nofollow"}]}]; },
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
