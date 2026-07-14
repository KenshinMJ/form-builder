/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(_input) {
    return {
      name: "form-builder",
      home: "aws",
      region: "ap-northeast-1",
    };
  },
  async run() {
    const nextJs = await import("./infra/nextjsSite");

    return {
      SiteUrl: nextJs.site.url,
    };
  },
});
