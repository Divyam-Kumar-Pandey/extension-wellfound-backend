import type { NextConfig } from "next";

const nextConfig = {
  async headers() {
      return [
          {
              source: '/api/:path*',
              // cors origin
              headers: [
                  {
                      key: 'Access-Control-Allow-Credentials',
                      value: 'true',
                  },
                  {
                      key: 'Access-Control-Allow-Origin',
                      value: 'https://wellfound.com',
                  },
                  {
                      key: 'Access-Control-Allow-Methods',
                      value: 'POST',
                  },
                  {
                      key: 'Access-Control-Allow-Headers',
                      value: 'X-CRSF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                  },
              ],
          }
      ]
  },
};

export default nextConfig;
