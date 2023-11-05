import { DocsThemeConfig } from "nextra-theme-docs";
import React from "react";

const config: DocsThemeConfig = {
  logo: (
    <>
    <svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="33"
  viewBox="0 0 30 33"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M24.887 19.0167H19.0182V13.148H13.1493V7.27902H24.887V19.0167ZM7.27988 24.8879H13.1486V19.0191H7.27988V24.8879ZM0 3.51549V28.6511C0 30.5924 1.57387 32.1665 3.51549 32.1665H28.6511C30.5927 32.1665 32.1665 30.5924 32.1665 28.6511V3.51549C32.1665 1.57387 30.5927 0 28.6511 0H3.51549C1.57387 0 0 1.57387 0 3.51549V3.51549Z"
    fill="#1db227"
  />

</svg>
<span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        Superfluid Checkout Docs
      </span>
</>

  ),
  project: {
    link: "https://github.com/superfluid-finance/widget/",
  },
  chat: {
    link: "https://discord.superfluid.finance/",
  },
  docsRepositoryBase: "https://github.com/superfluid-finance/widget/",
  footer: {
    text: "Superfluid Checkout Widget Docs",
  },
  nextThemes: {
    forcedTheme: 'dark'
  }
};

export default config;