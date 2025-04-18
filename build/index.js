var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = require("isbot"), ReactDOMServer = __toESM(require("react-dom/server"), 1), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return (0, import_isbot.isbot)(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 51,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 101,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new import_node_stream.PassThrough(), stream = (0, import_node.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Layout: () => Layout,
  default: () => App,
  links: () => links
});
var import_react5 = require("@remix-run/react"), import_react6 = require("react");

// app/components/Navbar.tsx
var import_react2 = require("react"), import_react3 = require("@remix-run/react"), import_fa = require("react-icons/fa"), import_clsx = __toESM(require("clsx"), 1), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime");
function Navbar() {
  let [isMenuOpen, setIsMenuOpen] = (0, import_react2.useState)(!1), toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("nav", { className: "bg-off-white py-4 sticky top-0 z-50 shadow-sm", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto flex justify-between items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react3.Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "img",
        {
          src: "https://i.imgur.com/ElKTTQt.png",
          alt: "Luxury Estates Logo",
          className: "h-2"
        },
        void 0,
        !1,
        {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 17,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "hidden md:flex space-x-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { to: "/", children: "Home" }, void 0, !1, {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { to: "/properties", children: "Properties" }, void 0, !1, {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { to: "/about", children: "About" }, void 0, !1, {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(NavLink, { to: "/contact", children: "Contact" }, void 0, !1, {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "button",
        {
          className: "md:hidden text-deep-green focus:outline-none",
          onClick: toggleMenu,
          "aria-label": "Toggle menu",
          children: isMenuOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_fa.FaTimes, { size: 24 }, void 0, !1, {
            fileName: "app/components/Navbar.tsx",
            lineNumber: 38,
            columnNumber: 25
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_fa.FaBars, { size: 24 }, void 0, !1, {
            fileName: "app/components/Navbar.tsx",
            lineNumber: 38,
            columnNumber: 49
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/Navbar.tsx",
          lineNumber: 33,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/Navbar.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "div",
      {
        className: (0, import_clsx.default)(
          "fixed inset-0 bg-deep-green bg-opacity-95 z-50 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "button",
            {
              className: "absolute top-5 right-5 text-off-white focus:outline-none",
              onClick: toggleMenu,
              "aria-label": "Close menu",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_fa.FaTimes, { size: 24 }, void 0, !1, {
                fileName: "app/components/Navbar.tsx",
                lineNumber: 54,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 49,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-col space-y-6 text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MobileNavLink, { to: "/", onClick: toggleMenu, children: "Home" }, void 0, !1, {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 57,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MobileNavLink, { to: "/properties", onClick: toggleMenu, children: "Properties" }, void 0, !1, {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MobileNavLink, { to: "/about", onClick: toggleMenu, children: "About" }, void 0, !1, {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 59,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(MobileNavLink, { to: "/contact", onClick: toggleMenu, children: "Contact" }, void 0, !1, {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Navbar.tsx",
            lineNumber: 56,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 43,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/Navbar.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
function NavLink({ to, children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    import_react3.Link,
    {
      to,
      className: "text-deep-green hover:text-terracotta transition-colors duration-200 font-medium",
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/Navbar.tsx",
      lineNumber: 69,
      columnNumber: 5
    },
    this
  );
}
function MobileNavLink({
  to,
  children,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    import_react3.Link,
    {
      to,
      className: "text-off-white text-2xl font-arioso hover:text-terracotta transition-colors duration-200",
      onClick,
      children
    },
    void 0,
    !1,
    {
      fileName: "app/components/Navbar.tsx",
      lineNumber: 88,
      columnNumber: 5
    },
    this
  );
}

// app/components/Footer.tsx
var import_react4 = require("@remix-run/react"), import_fa2 = require("react-icons/fa"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("footer", { className: "bg-deep-green text-off-white py-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
          "img",
          {
            src: "https://i.imgur.com/ElKTTQt.png",
            alt: "Luxury Estates Logo",
            className: "h-12 invert mb-4"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Footer.tsx",
            lineNumber: 11,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-sm max-w-xs text-center md:text-left", children: "Luxury vacation rentals in the most exclusive locations worldwide. Experience the extraordinary." }, void 0, !1, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 16,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 10,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-xl mb-4 font-arioso", children: "Quick Links" }, void 0, !1, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 23,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "space-y-2 text-center md:text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/", className: "hover:text-terracotta transition-colors", children: "Home" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 25,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 25,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/properties", className: "hover:text-terracotta transition-colors", children: "Properties" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 26,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 26,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/about", className: "hover:text-terracotta transition-colors", children: "About Us" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 27,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 27,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/contact", className: "hover:text-terracotta transition-colors", children: "Contact" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 28,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 28,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Link, { to: "/privacy", className: "hover:text-terracotta transition-colors", children: "Privacy Policy" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 29,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 29,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 24,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center md:items-start", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "text-xl mb-4 font-arioso", children: "Contact Us" }, void 0, !1, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 35,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("address", { className: "not-italic text-center md:text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "123 Luxury Lane" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 37,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "Beverly Hills, CA 90210" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 38,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "mt-2", children: "info@luxuryestates.com" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 39,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "+1 (800) 555-1234" }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 40,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 36,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex space-x-4 mt-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "https://facebook.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Facebook", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_fa2.FaFacebook, { className: "text-off-white hover:text-terracotta transition-colors", size: 20 }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 46,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 45,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "https://instagram.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Instagram", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_fa2.FaInstagram, { className: "text-off-white hover:text-terracotta transition-colors", size: 20 }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 49,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "https://twitter.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Twitter", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_fa2.FaTwitter, { className: "text-off-white hover:text-terracotta transition-colors", size: 20 }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 52,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 51,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("a", { href: "https://pinterest.com", target: "_blank", rel: "noopener noreferrer", "aria-label": "Pinterest", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_fa2.FaPinterest, { className: "text-off-white hover:text-terracotta transition-colors", size: 20 }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 55,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/components/Footer.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Footer.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Footer.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "border-t border-off-white border-opacity-20 mt-8 pt-8 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-sm", children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Luxury Estates. All rights reserved."
    ] }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/root.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
  }
];
function Layout({ children }) {
  let location = (0, import_react5.useLocation)();
  return (0, import_react6.useEffect)(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]), /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react5.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react5.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Navbar, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("main", { className: "min-h-screen", children }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Footer, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react5.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react5.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react5.Outlet, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}

// app/routes/properties._index.tsx
var properties_index_exports = {};
__export(properties_index_exports, {
  default: () => Properties,
  loader: () => loader,
  meta: () => meta
});
var import_react8 = require("@remix-run/react"), import_node2 = require("@remix-run/node");

// app/components/PropertyCard.tsx
var import_react7 = require("@remix-run/react"), import_fa3 = require("react-icons/fa"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function PropertyCard({ property }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_react7.Link,
    {
      to: `/properties/${property.id}`,
      className: "group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "relative h-64 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "img",
            {
              src: property.images[0],
              alt: property.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            },
            void 0,
            !1,
            {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 16,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-white font-medium text-lg", children: [
            "$",
            property.price,
            " / night"
          ] }, void 0, !0, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 22,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 21,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/PropertyCard.tsx",
          lineNumber: 15,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "p-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "text-2xl font-arioso text-deep-green mb-1", children: property.name }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 27,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-600 mb-3", children: property.location }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 28,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-gray-700 mb-4 line-clamp-2", children: property.shortDescription }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 30,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-wrap gap-4 text-sm text-gray-600", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_fa3.FaBed, { className: "text-deep-green" }, void 0, !1, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 34,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
                property.bedrooms,
                " Beds"
              ] }, void 0, !0, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 35,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 33,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_fa3.FaBath, { className: "text-deep-green" }, void 0, !1, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 38,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
                property.bathrooms,
                " Baths"
              ] }, void 0, !0, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 39,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_fa3.FaUsers, { className: "text-deep-green" }, void 0, !1, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 42,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
                property.maxGuests,
                " Guests"
              ] }, void 0, !0, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 43,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 41,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_fa3.FaRulerCombined, { className: "text-deep-green" }, void 0, !1, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 46,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
                property.squareFeet.toLocaleString(),
                " sq ft"
              ] }, void 0, !0, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 47,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 45,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 32,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-5 pt-4 border-t border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "inline-block bg-deep-green text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-terracotta", children: "View Property" }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 52,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/PropertyCard.tsx",
          lineNumber: 26,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/PropertyCard.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}

// app/models/property.ts
var properties = [
  {
    id: "villa-paradiso",
    name: "Villa Paradiso",
    location: "Malibu, California",
    price: 1200,
    description: "Perched on the cliffs of Malibu with breathtaking ocean views, Villa Paradiso is the epitome of coastal luxury. This stunning 5-bedroom villa features floor-to-ceiling windows that frame the Pacific Ocean, creating a seamless indoor-outdoor living experience. The infinity pool appears to merge with the horizon, while the spacious terrace provides the perfect setting for al fresco dining under the stars. Inside, the open-concept living space is adorned with designer furnishings and curated artwork. The gourmet kitchen boasts top-of-the-line appliances and a marble island, ideal for preparing meals or having a private chef create culinary masterpieces. Each bedroom offers a private sanctuary with plush bedding and ocean views. The primary suite includes a spa-like bathroom with a soaking tub positioned to take in the coastal panorama. Additional amenities include a home theater, wine cellar, and direct beach access via a private path.",
    shortDescription: "Perched on the cliffs of Malibu with breathtaking ocean views, this stunning 5-bedroom villa features an infinity pool, spacious terrace, and direct beach access.",
    amenities: [
      "Infinity Pool",
      "Ocean Views",
      "Private Beach Access",
      "Home Theater",
      "Wine Cellar",
      "Gourmet Kitchen",
      "Outdoor Dining Area",
      "Fireplace",
      "Air Conditioning",
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/ODJBFsx.jpeg",
      "https://i.imgur.com/754i92z.jpeg",
      "https://i.imgur.com/sC7evpD.jpeg",
      "https://i.imgur.com/SMClibD.jpeg",
      "https://i.imgur.com/0BkhibD.jpeg",
      "https://i.imgur.com/5ibXcVz.png",
      "https://i.imgur.com/DoiLlLO.jpeg",
      "https://i.imgur.com/2cfc5MI.jpeg",
      "https://i.imgur.com/DZsL3mm.jpeg"
    ],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 5.5,
    squareFeet: 6500
  },
  {
    id: "alpine-retreat",
    name: "Alpine Retreat",
    location: "Aspen, Colorado",
    price: 1800,
    description: "Nestled among the majestic peaks of Aspen, Alpine Retreat offers a luxurious mountain escape in every season. This timber and stone lodge combines rustic charm with modern luxury across its 6,000 square feet of living space. In winter, enjoy ski-in/ski-out access to world-class slopes, then return to warm up by the massive stone fireplace or in the outdoor heated pool and hot tub with mountain views. Summer brings opportunities for hiking, mountain biking, and fly fishing right from your doorstep. The great room features soaring ceilings with exposed beams and panoramic windows showcasing the alpine scenery. The gourmet kitchen is equipped for entertaining with professional-grade appliances and a large dining area that seats 12. Six beautifully appointed bedrooms, including a luxurious primary suite with a fireplace and private balcony, provide comfortable accommodations for up to 12 guests. Additional amenities include a game room with billiards and poker table, a media room, a fitness center, and a wine cellar.",
    shortDescription: "Nestled among the majestic peaks of Aspen, this timber and stone lodge offers ski-in/ski-out access, an outdoor heated pool, and panoramic mountain views.",
    amenities: [
      "Ski-in/Ski-out Access",
      "Heated Outdoor Pool",
      "Hot Tub",
      "Mountain Views",
      "Game Room",
      "Media Room",
      "Fitness Center",
      "Wine Cellar",
      "Fireplace",
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg",
      "https://i.imgur.com/X8GeIsx.png",
      "https://i.imgur.com/7C41uy2.jpeg"
    ],
    maxGuests: 12,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 6e3
  },
  {
    id: "tropical-haven",
    name: "Tropical Haven",
    location: "Kauai, Hawaii",
    price: 1500,
    description: "Experience the magic of Hawaii at Tropical Haven, a luxurious beachfront estate on Kauai's pristine North Shore. This Balinese-inspired property spans over an acre of lush tropical gardens leading directly to a secluded white sand beach. The main house and guest pavilions offer 4 bedrooms with en-suite bathrooms, accommodating up to 8 guests in complete privacy and comfort. Indoor and outdoor living spaces flow seamlessly through pocket doors that open to covered lanais and the spectacular infinity pool overlooking the Pacific Ocean. The professional kitchen features top-of-the-line appliances and an outdoor BBQ area perfect for entertaining. Wake up to breathtaking ocean views, spend your days swimming, snorkeling, and paddleboarding in the crystal-clear waters, then unwind with a massage in the dedicated spa pavilion. Additional amenities include an outdoor shower garden, meditation pavilion, and organic fruit orchard where guests can pick their own tropical fruits.",
    shortDescription: "A luxurious beachfront estate on Kauai's pristine North Shore with Balinese-inspired architecture, an infinity pool, and direct access to a secluded white sand beach.",
    amenities: [
      "Beachfront",
      "Infinity Pool",
      "Tropical Gardens",
      "Spa Pavilion",
      "Outdoor Shower",
      "Meditation Space",
      "Fruit Orchard",
      "Paddleboards & Snorkel Gear",
      "Air Conditioning",
      "WiFi"
    ],
    images: [
      "https://i.imgur.com/cZMdrKF.jpeg",
      "https://i.imgur.com/1GdDbqi.jpeg",
      "https://i.imgur.com/uC87ART.jpeg",
      "https://i.imgur.com/vtFQnQj.jpeg",
      "https://i.imgur.com/4v3rmg0.jpeg"
    ],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    squareFeet: 4200
  }
];
function getProperties() {
  return properties;
}
function getProperty(id) {
  return properties.find((property) => property.id === id);
}

// app/routes/properties._index.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), loader = async () => {
  let properties2 = getProperties();
  return (0, import_node2.json)({ properties: properties2 });
}, meta = () => [
  { title: "Our Properties | Luxury Estates" },
  { name: "description", content: "Browse our collection of luxury vacation rentals in the world's most coveted destinations." }
];
function Properties() {
  let { properties: properties2 } = (0, import_react8.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-off-white py-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-4", children: "Our Luxury Properties" }, void 0, !1, {
        fileName: "app/routes/properties._index.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Discover our handpicked collection of extraordinary homes in the world's most desirable locations" }, void 0, !1, {
        fileName: "app/routes/properties._index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: properties2.map((property) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(PropertyCard, { property }, property.id, !1, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 35,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/properties._index.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/properties._index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/routes/properties.$id.tsx
var properties_id_exports = {};
__export(properties_id_exports, {
  default: () => PropertyDetail,
  loader: () => loader2,
  meta: () => meta2
});
var import_react11 = require("@remix-run/react"), import_node3 = require("@remix-run/node"), import_fa6 = require("react-icons/fa");

// app/components/PropertyGallery.tsx
var import_react9 = require("react"), import_react_slick = __toESM(require("react-slick"), 1), import_fa4 = require("react-icons/fa"), import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function NextArrow(props) {
  let { onClick } = props;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    "button",
    {
      className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-deep-green transition-all duration-300",
      onClick,
      "aria-label": "Next image",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa4.FaArrowRight, { size: 20 }, void 0, !1, {
        fileName: "app/components/PropertyGallery.tsx",
        lineNumber: 18,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 13,
      columnNumber: 5
    },
    this
  );
}
function PrevArrow(props) {
  let { onClick } = props;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
    "button",
    {
      className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-deep-green transition-all duration-300",
      onClick,
      "aria-label": "Previous image",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_fa4.FaArrowLeft, { size: 20 }, void 0, !1, {
        fileName: "app/components/PropertyGallery.tsx",
        lineNumber: 31,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    this
  );
}
function PropertyGallery({ images, propertyName }) {
  let [currentSlide, setCurrentSlide] = (0, import_react9.useState)(0), [lightboxOpen, setLightboxOpen] = (0, import_react9.useState)(!1), mainSettings = {
    dots: !1,
    infinite: !0,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(NextArrow, {}, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 46,
      columnNumber: 16
    }, this),
    prevArrow: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(PrevArrow, {}, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 47,
      columnNumber: 16
    }, this),
    beforeChange: (_, next) => setCurrentSlide(next)
  }, thumbnailSettings = {
    dots: !1,
    infinite: !0,
    speed: 500,
    slidesToShow: images.length > 5 ? 5 : images.length,
    slidesToScroll: 1,
    focusOnSelect: !0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: images.length > 4 ? 4 : images.length
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: images.length > 3 ? 3 : images.length
        }
      }
    ]
  }, lightboxSettings = {
    dots: !0,
    infinite: !0,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    nextArrow: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(NextArrow, {}, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 81,
      columnNumber: 16
    }, this),
    prevArrow: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(PrevArrow, {}, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 82,
      columnNumber: 16
    }, this)
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "property-gallery", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "main-slider mb-2 cursor-pointer", onClick: () => setLightboxOpen(!0), children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react_slick.default, { ...mainSettings, children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "h-[500px]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "img",
      {
        src: image,
        alt: `${propertyName} - Image ${index + 1}`,
        className: "w-full h-full object-cover rounded-lg"
      },
      void 0,
      !1,
      {
        fileName: "app/components/PropertyGallery.tsx",
        lineNumber: 91,
        columnNumber: 15
      },
      this
    ) }, index, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 90,
      columnNumber: 13
    }, this)) }, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 88,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 87,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "thumbnail-slider", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      import_react_slick.default,
      {
        dots: thumbnailSettings.dots,
        infinite: thumbnailSettings.infinite,
        speed: thumbnailSettings.speed,
        slidesToShow: thumbnailSettings.slidesToShow,
        slidesToScroll: thumbnailSettings.slidesToScroll,
        focusOnSelect: thumbnailSettings.focusOnSelect,
        responsive: thumbnailSettings.responsive,
        children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "px-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
          "button",
          {
            onClick: () => setCurrentSlide(index),
            className: `block w-full h-24 overflow-hidden rounded-md ${currentSlide === index ? "ring-2 ring-deep-green" : ""}`,
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
              "img",
              {
                src: image,
                alt: `${propertyName} - Thumbnail ${index + 1}`,
                className: "w-full h-full object-cover"
              },
              void 0,
              !1,
              {
                fileName: "app/components/PropertyGallery.tsx",
                lineNumber: 117,
                columnNumber: 17
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/components/PropertyGallery.tsx",
            lineNumber: 113,
            columnNumber: 15
          },
          this
        ) }, index, !1, {
          fileName: "app/components/PropertyGallery.tsx",
          lineNumber: 112,
          columnNumber: 13
        }, this))
      },
      void 0,
      !1,
      {
        fileName: "app/components/PropertyGallery.tsx",
        lineNumber: 102,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    lightboxOpen && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        "button",
        {
          className: "absolute top-4 right-4 text-white hover:text-terracotta z-10",
          onClick: () => setLightboxOpen(!1),
          "aria-label": "Close gallery",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0, !1, {
            fileName: "app/components/PropertyGallery.tsx",
            lineNumber: 137,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "app/components/PropertyGallery.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/PropertyGallery.tsx",
          lineNumber: 131,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "w-full max-w-6xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_react_slick.default,
        {
          dots: lightboxSettings.dots,
          infinite: lightboxSettings.infinite,
          speed: lightboxSettings.speed,
          slidesToShow: lightboxSettings.slidesToShow,
          slidesToScroll: lightboxSettings.slidesToScroll,
          initialSlide: lightboxSettings.initialSlide,
          nextArrow: lightboxSettings.nextArrow,
          prevArrow: lightboxSettings.prevArrow,
          children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "h-[80vh] flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            "img",
            {
              src: image,
              alt: `${propertyName} - Image ${index + 1}`,
              className: "max-w-full max-h-full object-contain"
            },
            void 0,
            !1,
            {
              fileName: "app/components/PropertyGallery.tsx",
              lineNumber: 154,
              columnNumber: 19
            },
            this
          ) }, index, !1, {
            fileName: "app/components/PropertyGallery.tsx",
            lineNumber: 153,
            columnNumber: 17
          }, this))
        },
        void 0,
        !1,
        {
          fileName: "app/components/PropertyGallery.tsx",
          lineNumber: 142,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/PropertyGallery.tsx",
        lineNumber: 141,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/PropertyGallery.tsx",
      lineNumber: 130,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/PropertyGallery.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
}

// app/components/BookingForm.tsx
var import_react10 = require("react"), import_react_datepicker = __toESM(require("react-datepicker"), 1), import_date_fns = require("date-fns"), import_fa5 = require("react-icons/fa");
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function BookingForm({ property }) {
  let [startDate, setStartDate] = (0, import_react10.useState)(null), [endDate, setEndDate] = (0, import_react10.useState)(null), [guests, setGuests] = (0, import_react10.useState)(1), [name, setName] = (0, import_react10.useState)(""), [email, setEmail] = (0, import_react10.useState)(""), [phone, setPhone] = (0, import_react10.useState)(""), [specialRequests, setSpecialRequests] = (0, import_react10.useState)(""), [isSubmitting, setIsSubmitting] = (0, import_react10.useState)(!1), [isSuccess, setIsSuccess] = (0, import_react10.useState)(!1), [errors, setErrors] = (0, import_react10.useState)({}), handleStartDateChange = (date) => {
    setStartDate(date), date && endDate && date > endDate && setEndDate((0, import_date_fns.addDays)(date, 1));
  }, handleEndDateChange = (date) => {
    setEndDate(date);
  }, calculateTotal = () => !startDate || !endDate ? 0 : (0, import_date_fns.differenceInDays)(endDate, startDate) * property.price, validateForm = () => {
    let newErrors = {};
    return startDate || (newErrors.startDate = "Check-in date is required"), endDate || (newErrors.endDate = "Check-out date is required"), name.trim() || (newErrors.name = "Name is required"), email.trim() ? /\S+@\S+\.\S+/.test(email) || (newErrors.email = "Email is invalid") : newErrors.email = "Email is required", phone.trim() || (newErrors.phone = "Phone number is required"), setErrors(newErrors), Object.keys(newErrors).length === 0;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 sticky top-24", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h3", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Book Your Stay" }, void 0, !1, {
      fileName: "app/components/BookingForm.tsx",
      lineNumber: 97,
      columnNumber: 7
    }, this),
    isSuccess ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "font-medium", children: "Booking request submitted successfully!" }, void 0, !1, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-sm mt-1", children: "We'll contact you shortly to confirm your reservation." }, void 0, !1, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/BookingForm.tsx",
      lineNumber: 100,
      columnNumber: 7
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("form", { onSubmit: (e) => {
      e.preventDefault(), validateForm() && (setIsSubmitting(!0), setTimeout(() => {
        console.log({
          property: property.id,
          startDate,
          endDate,
          guests,
          name,
          email,
          phone,
          specialRequests,
          total: calculateTotal()
        }), setIsSubmitting(!1), setIsSuccess(!0), setTimeout(() => {
          setIsSuccess(!1), setStartDate(null), setEndDate(null), setGuests(1), setName(""), setEmail(""), setPhone(""), setSpecialRequests("");
        }, 3e3);
      }, 1500));
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex justify-between mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "price", className: "block text-gray-700 font-medium", children: "Price" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 108,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { className: "text-deep-green font-bold", children: [
          "$",
          property.price,
          " / night"
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 109,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 107,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "check-in", className: "block text-gray-700 font-medium mb-1", children: "Check-in" }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 115,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
              import_react_datepicker.default,
              {
                id: "check-in",
                selected: startDate,
                onChange: handleStartDateChange,
                selectsStart: !0,
                startDate,
                endDate,
                minDate: /* @__PURE__ */ new Date(),
                placeholderText: "Select date",
                className: `w-full p-2 border rounded-md ${errors.startDate ? "border-red-500" : "border-gray-300"}`
              },
              void 0,
              !1,
              {
                fileName: "app/components/BookingForm.tsx",
                lineNumber: 117,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_fa5.FaCalendarAlt, { className: "absolute right-3 top-3 text-gray-400" }, void 0, !1, {
              fileName: "app/components/BookingForm.tsx",
              lineNumber: 128,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 116,
            columnNumber: 15
          }, this),
          errors.startDate && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.startDate }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 130,
            columnNumber: 36
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "check-out", className: "block text-gray-700 font-medium mb-1", children: "Check-out" }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
              import_react_datepicker.default,
              {
                id: "check-out",
                selected: endDate,
                onChange: handleEndDateChange,
                selectsEnd: !0,
                startDate,
                endDate,
                minDate: startDate ? (0, import_date_fns.addDays)(startDate, 1) : /* @__PURE__ */ new Date(),
                placeholderText: "Select date",
                className: `w-full p-2 border rounded-md ${errors.endDate ? "border-red-500" : "border-gray-300"}`
              },
              void 0,
              !1,
              {
                fileName: "app/components/BookingForm.tsx",
                lineNumber: 136,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_fa5.FaCalendarAlt, { className: "absolute right-3 top-3 text-gray-400" }, void 0, !1, {
              fileName: "app/components/BookingForm.tsx",
              lineNumber: 147,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 135,
            columnNumber: 15
          }, this),
          errors.endDate && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.endDate }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 149,
            columnNumber: 34
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 133,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 113,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "guests", className: "block text-gray-700 font-medium mb-1", children: "Guests" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 154,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            "select",
            {
              id: "guests",
              value: guests,
              onChange: (e) => setGuests(Number(e.target.value)),
              className: "w-full p-2 border border-gray-300 rounded-md appearance-none",
              children: [...Array(property.maxGuests)].map(
                (_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("option", { value: i + 1, children: [
                  i + 1,
                  " ",
                  i === 0 ? "Guest" : "Guests"
                ] }, i, !0, {
                  fileName: "app/components/BookingForm.tsx",
                  lineNumber: 163,
                  columnNumber: 15
                }, this)
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/BookingForm.tsx",
              lineNumber: 156,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_fa5.FaUsers, { className: "absolute right-3 top-3 text-gray-400" }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 168,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "name", className: "block text-gray-700 font-medium mb-1", children: "Full Name" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "input",
          {
            type: "text",
            id: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: `w-full p-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`,
            placeholder: "John Doe"
          },
          void 0,
          !1,
          {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 174,
            columnNumber: 13
          },
          this
        ),
        errors.name && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.name }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 182,
          columnNumber: 29
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "email", className: "block text-gray-700 font-medium mb-1", children: "Email" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 186,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "input",
          {
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: `w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`,
            placeholder: "john@example.com"
          },
          void 0,
          !1,
          {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 187,
            columnNumber: 13
          },
          this
        ),
        errors.email && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.email }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 195,
          columnNumber: 30
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 185,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "phone", className: "block text-gray-700 font-medium mb-1", children: "Phone" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "input",
          {
            type: "tel",
            id: "phone",
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            className: `w-full p-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`,
            placeholder: "(123) 456-7890"
          },
          void 0,
          !1,
          {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 200,
            columnNumber: 13
          },
          this
        ),
        errors.phone && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.phone }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 208,
          columnNumber: 30
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("label", { htmlFor: "special-requests", className: "block text-gray-700 font-medium mb-1", children: "Special Requests" }, void 0, !1, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 212,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
          "textarea",
          {
            id: "special-requests",
            value: specialRequests,
            onChange: (e) => setSpecialRequests(e.target.value),
            className: "w-full p-2 border border-gray-300 rounded-md",
            rows: 3,
            placeholder: "Any special requests or questions?"
          },
          void 0,
          !1,
          {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 213,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 211,
        columnNumber: 11
      }, this),
      startDate && endDate && /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "mb-6 bg-gray-50 p-4 rounded-md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex justify-between mb-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: [
            "$",
            property.price,
            " x ",
            (0, import_date_fns.differenceInDays)(endDate, startDate),
            " nights"
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: [
            "$",
            calculateTotal()
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 229,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "border-t border-gray-200 pt-2 mt-2 font-bold flex justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "Total" }, void 0, !1, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 232,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: [
            "$",
            calculateTotal()
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 231,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/BookingForm.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "w-full bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex justify-center items-center",
          disabled: isSubmitting,
          children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_jsx_dev_runtime8.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, !1, {
                fileName: "app/components/BookingForm.tsx",
                lineNumber: 246,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, !1, {
                fileName: "app/components/BookingForm.tsx",
                lineNumber: 247,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/BookingForm.tsx",
              lineNumber: 245,
              columnNumber: 17
            }, this),
            "Processing..."
          ] }, void 0, !0, {
            fileName: "app/components/BookingForm.tsx",
            lineNumber: 244,
            columnNumber: 11
          }, this) : "Book Now"
        },
        void 0,
        !1,
        {
          fileName: "app/components/BookingForm.tsx",
          lineNumber: 238,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/BookingForm.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/BookingForm.tsx",
    lineNumber: 96,
    columnNumber: 5
  }, this);
}

// app/routes/properties.$id.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader2 = async ({ params }) => {
  let propertyId = params.id;
  if (!propertyId)
    return (0, import_node3.redirect)("/properties");
  let property = getProperty(propertyId);
  if (!property)
    throw new Response("Property not found", { status: 404 });
  return (0, import_node3.json)({ property });
}, meta2 = ({ data }) => !data || !data.property ? [
  { title: "Property Not Found | Luxury Estates" },
  { name: "description", content: "The requested property could not be found." }
] : [
  { title: `${data.property.name} | Luxury Estates` },
  { name: "description", content: data.property.shortDescription }
];
function PropertyDetail() {
  let { property } = (0, import_react11.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-off-white pb-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-2", children: property.name }, void 0, !1, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center text-gray-600 mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_fa6.FaMapMarkerAlt, { className: "mr-2 text-terracotta" }, void 0, !1, {
          fileName: "app/routes/properties.$id.tsx",
          lineNumber: 49,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: property.location }, void 0, !1, {
          fileName: "app/routes/properties.$id.tsx",
          lineNumber: 50,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(PropertyGallery, { images: property.images, propertyName: property.name }, void 0, !1, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 53,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/properties.$id.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex flex-wrap gap-6 mb-6 text-gray-700", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_fa6.FaBed, { className: "text-deep-green text-xl" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 62,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "font-medium", children: property.bedrooms }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 64,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Bedrooms" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 65,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 63,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 61,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_fa6.FaBath, { className: "text-deep-green text-xl" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 69,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "font-medium", children: property.bathrooms }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 71,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Bathrooms" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 72,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 70,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 68,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_fa6.FaUsers, { className: "text-deep-green text-xl" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 76,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "font-medium", children: property.maxGuests }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 78,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Guests" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 79,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 77,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 75,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_fa6.FaRulerCombined, { className: "text-deep-green text-xl" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 83,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "font-medium", children: property.squareFeet.toLocaleString() }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 85,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-sm text-gray-500", children: "Sq Ft" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 86,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 84,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 82,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "About this property" }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 91,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-gray-700 mb-6 whitespace-pre-line", children: property.description }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-3", children: "Amenities" }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 96,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("ul", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700", children: property.amenities.map((amenity, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 text-terracotta", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }, void 0, !1, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 101,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 100,
              columnNumber: 21
            }, this),
            amenity
          ] }, index, !0, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 99,
            columnNumber: 19
          }, this)) }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 97,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/properties.$id.tsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 mb-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Location" }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 111,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "aspect-video bg-gray-200 rounded-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
            "iframe",
            {
              width: "100%",
              height: "100%",
              frameBorder: "0",
              title: `Map showing location of ${property.name}`,
              src: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`,
              allowFullScreen: !0
            },
            void 0,
            !1,
            {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 113,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 112,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/properties.$id.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Policies" }, void 0, !1, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 126,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "font-medium text-gray-800 mb-2", children: "Check-in & Check-out" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 130,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("ul", { className: "space-y-1 text-gray-700", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "Check-in: 4:00 PM - 8:00 PM" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 132,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "Check-out: 11:00 AM" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 133,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "Early check-in available upon request" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 134,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "Self check-in with smart lock" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 135,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 131,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 129,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "font-medium text-gray-800 mb-2", children: "House Rules" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 140,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("ul", { className: "space-y-1 text-gray-700", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "No smoking" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 142,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "No pets" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 143,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "No parties or events" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 144,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("li", { children: "Quiet hours: 10:00 PM - 8:00 AM" }, void 0, !1, {
                  fileName: "app/routes/properties.$id.tsx",
                  lineNumber: 145,
                  columnNumber: 21
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 141,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 139,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "font-medium text-gray-800 mb-2", children: "Cancellation Policy" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 150,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-gray-700", children: "Free cancellation up to 30 days before check-in. Cancel within 30 days of check-in and receive a 50% refund, minus the service fee." }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 151,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 149,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "font-medium text-gray-800 mb-2", children: "Additional Notes" }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 157,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-gray-700", children: "Security deposit of $1,000 required. This will be returned within 7 days of check-out, provided no damages are reported." }, void 0, !1, {
                fileName: "app/routes/properties.$id.tsx",
                lineNumber: 158,
                columnNumber: 19
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/properties.$id.tsx",
              lineNumber: 156,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/properties.$id.tsx",
            lineNumber: 128,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/properties.$id.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 57,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(BookingForm, { property }, void 0, !1, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 168,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/properties.$id.tsx",
        lineNumber: 167,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/properties.$id.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/properties.$id.tsx",
    lineNumber: 45,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/properties.$id.tsx",
    lineNumber: 44,
    columnNumber: 5
  }, this);
}

// app/routes/contact.tsx
var contact_exports = {};
__export(contact_exports, {
  default: () => Contact,
  meta: () => meta3
});
var import_react12 = require("react"), import_fa7 = require("react-icons/fa"), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), meta3 = () => [
  { title: "Contact Us | Luxury Estates" },
  { name: "description", content: "Get in touch with our team to inquire about our luxury vacation rentals or to book your next stay." }
];
function Contact() {
  let [formData, setFormData] = (0, import_react12.useState)({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  }), [errors, setErrors] = (0, import_react12.useState)({}), [isSubmitting, setIsSubmitting] = (0, import_react12.useState)(!1), [isSuccess, setIsSuccess] = (0, import_react12.useState)(!1), handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, validateForm = () => {
    let newErrors = {};
    return formData.name.trim() || (newErrors.name = "Name is required"), formData.email.trim() ? /\S+@\S+\.\S+/.test(formData.email) || (newErrors.email = "Email is invalid") : newErrors.email = "Email is required", formData.subject || (newErrors.subject = "Please select a subject"), formData.message.trim() || (newErrors.message = "Message is required"), setErrors(newErrors), Object.keys(newErrors).length === 0;
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-off-white py-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-8 text-center", children: "Contact Us" }, void 0, !1, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_fa7.FaEnvelope, { className: "text-deep-green text-xl" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 81,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 80,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Email Us" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Our team is here to help with any questions" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("a", { href: "mailto:info@luxuryestates.com", className: "text-terracotta hover:underline", children: "info@luxuryestates.com" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_fa7.FaPhone, { className: "text-deep-green text-xl" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Call Us" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 92,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Speak directly with our concierge team" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("a", { href: "tel:+18005551234", className: "text-terracotta hover:underline", children: "+1 (800) 555-1234" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 94,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_fa7.FaMapMarkerAlt, { className: "text-deep-green text-xl" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 99,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Visit Us" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 101,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Our headquarters location" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 102,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("address", { className: "not-italic text-terracotta", children: [
          "123 Luxury Lane",
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 104,
            columnNumber: 32
          }, this),
          "Beverly Hills, CA 90210"
        ] }, void 0, !0, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 78,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-6", children: "Send Us a Message" }, void 0, !1, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 111,
        columnNumber: 13
      }, this),
      isSuccess && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "font-medium", children: "Thank you for your message!" }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 115,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-sm mt-1", children: "We've received your inquiry and will get back to you shortly." }, void 0, !1, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 116,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 114,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("form", { onSubmit: (e) => {
        e.preventDefault(), validateForm() && (setIsSubmitting(!0), setTimeout(() => {
          console.log(formData), setIsSubmitting(!1), setIsSuccess(!0), setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          }), setTimeout(() => {
            setIsSuccess(!1);
          }, 5e3);
        }, 1500));
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: "name", className: "block text-gray-700 font-medium mb-1", children: "Your Name*" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 123,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              "input",
              {
                type: "text",
                id: "name",
                name: "name",
                value: formData.name,
                onChange: handleChange,
                className: `w-full p-3 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`,
                placeholder: "John Doe"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 124,
                columnNumber: 19
              },
              this
            ),
            errors.name && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.name }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 133,
              columnNumber: 35
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 122,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: "email", className: "block text-gray-700 font-medium mb-1", children: "Email Address*" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 137,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              "input",
              {
                type: "email",
                id: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                className: `w-full p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`,
                placeholder: "john@example.com"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 138,
                columnNumber: 19
              },
              this
            ),
            errors.email && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.email }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 147,
              columnNumber: 36
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 136,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: "phone", className: "block text-gray-700 font-medium mb-1", children: "Phone Number" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 151,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              "input",
              {
                type: "tel",
                id: "phone",
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                className: "w-full p-3 border border-gray-300 rounded-md",
                placeholder: "(123) 456-7890"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 152,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 150,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: "subject", className: "block text-gray-700 font-medium mb-1", children: "Subject*" }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 164,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              "select",
              {
                id: "subject",
                name: "subject",
                value: formData.subject,
                onChange: handleChange,
                className: `w-full p-3 border rounded-md ${errors.subject ? "border-red-500" : "border-gray-300"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "", children: "Select a subject" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 172,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "booking", children: "Property Booking" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 173,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "inquiry", children: "Property Inquiry" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 174,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "support", children: "Customer Support" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 175,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "partnership", children: "Partnership Opportunity" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 176,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("option", { value: "other", children: "Other" }, void 0, !1, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 177,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 165,
                columnNumber: 19
              },
              this
            ),
            errors.subject && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.subject }, void 0, !1, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 179,
              columnNumber: 38
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 163,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 121,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("label", { htmlFor: "message", className: "block text-gray-700 font-medium mb-1", children: "Message*" }, void 0, !1, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            "textarea",
            {
              id: "message",
              name: "message",
              value: formData.message,
              onChange: handleChange,
              rows: 5,
              className: `w-full p-3 border rounded-md ${errors.message ? "border-red-500" : "border-gray-300"}`,
              placeholder: "How can we help you?"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/contact.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          errors.message && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.message }, void 0, !1, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 194,
            columnNumber: 36
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center",
            disabled: isSubmitting,
            children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, !1, {
                  fileName: "app/routes/contact.tsx",
                  lineNumber: 205,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, !1, {
                  fileName: "app/routes/contact.tsx",
                  lineNumber: 206,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/contact.tsx",
                lineNumber: 204,
                columnNumber: 21
              }, this),
              "Sending..."
            ] }, void 0, !0, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 203,
              columnNumber: 19
            }, this) : "Send Message"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/contact.tsx",
            lineNumber: 197,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 110,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 75,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 74,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta4
});
var import_react13 = require("@remix-run/react"), import_fa8 = require("react-icons/fa");

// app/components/Hero.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function Hero() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "relative h-screen", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "absolute inset-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      "img",
      {
        src: "public/images/IMG_8545.png",
        alt: "Luxury Estate Villa Paradiso",
        className: "w-full h-full object-cover"
      },
      void 0,
      !1,
      {
        fileName: "app/components/Hero.tsx",
        lineNumber: 5,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/Hero.tsx",
      lineNumber: 4,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      "img",
      {
        src: "/images/logo-white.png",
        alt: "Luxury Estates",
        className: "h-16"
      },
      void 0,
      !1,
      {
        fileName: "app/components/Hero.tsx",
        lineNumber: 12,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/Hero.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Hero.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime"), meta4 = () => [
  { title: "Luxury Estates - Exceptional Vacation Rentals" },
  { name: "description", content: "Discover our curated collection of luxury vacation rentals in the world's most coveted destinations." }
];
function Index() {
  let properties2 = getProperties();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(Hero, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("section", { id: "featured-properties", className: "py-16 bg-off-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { className: "text-4xl font-arioso text-deep-green mb-4", children: "Featured Properties" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 27,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Explore our handpicked selection of extraordinary homes in the world's most desirable locations" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: properties2.map((property) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(PropertyCard, { property }, property.id, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 35,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-center mt-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        import_react13.Link,
        {
          to: "/properties",
          className: "inline-flex items-center gap-2 bg-deep-green hover:bg-terracotta text-white font-medium px-6 py-3 rounded-md transition-colors duration-300",
          children: [
            "View All Properties",
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_fa8.FaArrowRight, {}, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 45,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 40,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("section", { className: "py-16 bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { className: "text-4xl font-arioso text-deep-green mb-4", children: "Experience Luxury Like Never Before" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-gray-600 mb-6", children: "At Luxury Estates, we believe that extraordinary experiences begin with exceptional homes. Our curated collection of properties represents the pinnacle of luxury in the world's most coveted destinations." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 57,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-gray-600 mb-6", children: "Each home in our portfolio is personally selected for its unique character, stunning location, and unparalleled amenities. From beachfront villas to mountain retreats, our properties offer the perfect setting for unforgettable vacations." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-gray-600 mb-8", children: "Our dedicated concierge team ensures that every aspect of your stay exceeds expectations, from personalized check-ins to arranging private chefs, spa services, and exclusive experiences." }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 63,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react13.Link,
          {
            to: "/about",
            className: "inline-flex items-center gap-2 text-deep-green hover:text-terracotta font-medium transition-colors duration-300",
            children: [
              "Learn More About Us",
              /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_fa8.FaArrowRight, {}, void 0, !1, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 71,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 66,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/ODJBFsx.jpeg",
              alt: "Luxury Interior",
              className: "w-full h-64 object-cover rounded-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 77,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/cZMdrKF.jpeg",
              alt: "Mountain View",
              className: "w-full h-40 object-cover rounded-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 82,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 76,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/1GdDbqi.jpeg",
              alt: "Pool View",
              className: "w-full h-40 object-cover rounded-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 89,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/754i92z.jpeg",
              alt: "Ocean View",
              className: "w-full h-64 object-cover rounded-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 94,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 75,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 54,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 53,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("section", { className: "py-16 bg-deep-green text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { className: "text-4xl font-arioso mb-4", children: "What Our Guests Say" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-off-white/80 max-w-2xl mx-auto", children: "Hear from guests who have experienced the exceptional service and luxury of our properties" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 120,
            columnNumber: 21
          }, this) }, i, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 119,
            columnNumber: 19
          }, this)) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "mb-4 italic", children: '"Our stay at Villa Paradiso exceeded all expectations. The views were breathtaking, the home was immaculate, and the concierge service made everything effortless. Truly a once-in-a-lifetime experience."' }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 124,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "font-medium", children: "Sarah & James" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 128,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "New York, NY" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 129,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 137,
            columnNumber: 21
          }, this) }, i, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this)) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "mb-4 italic", children: `"Alpine Retreat was the perfect setting for our family reunion. The attention to detail in the home was remarkable, and having ski-in/ski-out access made our vacation truly special. We're already planning our return."` }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 141,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "font-medium", children: "The Thompson Family" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 145,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "Chicago, IL" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 146,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 144,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 133,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 154,
            columnNumber: 21
          }, this) }, i, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 153,
            columnNumber: 19
          }, this)) }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 151,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "mb-4 italic", children: '"Tropical Haven was pure paradise. Waking up to the sound of waves and having direct beach access was magical. The property manager went above and beyond to make our honeymoon unforgettable."' }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "font-medium", children: "Michael & Emma" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 162,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "London, UK" }, void 0, !1, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 163,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 161,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("section", { className: "py-16 bg-off-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "bg-terracotta rounded-xl p-8 md:p-12 text-white text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", { className: "text-3xl md:text-4xl font-arioso mb-4", children: "Ready to Experience Luxury?" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 174,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "max-w-2xl mx-auto mb-8 text-white/90", children: "Book your dream vacation today and discover why our guests return year after year" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 175,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        import_react13.Link,
        {
          to: "/properties",
          className: "inline-block bg-white text-deep-green hover:bg-deep-green hover:text-white font-medium px-8 py-3 rounded-md transition-colors duration-300",
          children: "Browse Properties"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 178,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 172,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 171,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => About,
  meta: () => meta5
});
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime"), meta5 = () => [
  { title: "About Us | Luxury Estates" },
  { name: "description", content: "Learn about Luxury Estates and our commitment to providing exceptional vacation experiences." }
];
function About() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-off-white py-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-8 text-center", children: "About Luxury Estates" }, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8 mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Our Story" }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 18,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700 mb-6", children: "Luxury Estates was founded in 2010 with a simple mission: to provide discerning travelers with access to the world's most extraordinary homes, coupled with personalized service that exceeds expectations." }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700 mb-6", children: "What began as a small collection of properties in the Hamptons has grown into a curated portfolio spanning the globe's most coveted destinations\u2014from the sun-drenched coasts of California and the Caribbean to the snow-capped peaks of the Alps and the lush landscapes of Hawaii." }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 22,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700", children: "Despite our growth, our commitment to excellence remains unwavering. Each property in our collection is personally vetted by our team to ensure it meets our exacting standards for design, location, amenities, and service." }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.tsx",
      lineNumber: 17,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Our Philosophy" }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 32,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700 mb-6", children: "We believe that a truly luxurious vacation is about more than just beautiful surroundings\u2014it's about creating moments of joy, connection, and discovery that become cherished memories." }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 33,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700", children: "Every aspect of our service is designed with this philosophy in mind, from the thoughtful amenities in our homes to the personalized recommendations from our concierge team." }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 36,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/about.tsx",
        lineNumber: 31,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Our Commitment" }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 42,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700 mb-6", children: "We are committed to responsible tourism and sustainable practices. We work closely with property owners to implement eco-friendly initiatives and support local communities in the destinations where we operate." }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 43,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700", children: "We also believe in giving back, which is why a portion of every booking goes to our Luxury Estates Foundation, supporting environmental conservation and education in our destinations." }, void 0, !1, {
          fileName: "app/routes/about.tsx",
          lineNumber: 46,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/about.tsx",
        lineNumber: 41,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8 mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-4", children: "Meet Our Team" }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 53,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-700 mb-6", children: "Behind Luxury Estates is a team of passionate travel enthusiasts, hospitality experts, and local specialists who share a common goal: to create exceptional experiences for our guests." }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 54,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("img", { src: "https://i.pravatar.cc/300?img=1", alt: "Team Member", className: "w-full h-full object-cover" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 61,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 60,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "font-medium text-deep-green", children: "Alexandra Chen" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 63,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-600 text-sm", children: "Founder & CEO" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 64,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.tsx",
          lineNumber: 59,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("img", { src: "https://i.pravatar.cc/300?img=11", alt: "Team Member", className: "w-full h-full object-cover" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 69,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 68,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "font-medium text-deep-green", children: "Marcus Johnson" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 71,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-600 text-sm", children: "Head of Property Curation" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 72,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.tsx",
          lineNumber: 67,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("img", { src: "https://i.pravatar.cc/300?img=9", alt: "Team Member", className: "w-full h-full object-cover" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 77,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 76,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h3", { className: "font-medium text-deep-green", children: "Sophia Rodriguez" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 79,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-gray-600 text-sm", children: "Guest Experience Director" }, void 0, !1, {
            fileName: "app/routes/about.tsx",
            lineNumber: 80,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/about.tsx",
          lineNumber: 75,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/about.tsx",
        lineNumber: 58,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/about.tsx",
      lineNumber: 52,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "bg-terracotta rounded-xl p-8 text-white text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", { className: "text-3xl font-arioso mb-4", children: "Join Our Journey" }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 86,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "max-w-2xl mx-auto mb-6", children: "Experience the Luxury Estates difference for yourself. Browse our collection of extraordinary homes and start planning your next unforgettable vacation." }, void 0, !1, {
        fileName: "app/routes/about.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "a",
        {
          href: "/properties",
          className: "inline-block bg-white text-deep-green hover:bg-deep-green hover:text-white font-medium px-6 py-3 rounded-md transition-colors duration-300",
          children: "Explore Our Properties"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/about.tsx",
          lineNumber: 90,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/about.tsx",
      lineNumber: 85,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/about.tsx",
    lineNumber: 14,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/about.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/about.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-MRRSE6L2.js", imports: ["/build/_shared/chunk-4LG37ZVK.js", "/build/_shared/chunk-7HYSD3WE.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-QRUGBWEM.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: "_index", index: void 0, caseSensitive: void 0, module: "/build/routes/_index-CWVXPY5P.js", imports: ["/build/_shared/chunk-JXUZXZTZ.js", "/build/_shared/chunk-BIWEWJ6N.js", "/build/_shared/chunk-YNAFJ7EJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/about": { id: "routes/about", parentId: "root", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/about-GSFQXL7O.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/contact": { id: "routes/contact", parentId: "root", path: "contact", index: void 0, caseSensitive: void 0, module: "/build/routes/contact-PXGBHNDN.js", imports: ["/build/_shared/chunk-YNAFJ7EJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/properties.$id": { id: "routes/properties.$id", parentId: "root", path: "properties/:id", index: void 0, caseSensitive: void 0, module: "/build/routes/properties.$id-IBWGKPK3.js", imports: ["/build/_shared/chunk-WO4U5INL.js", "/build/_shared/chunk-BIWEWJ6N.js", "/build/_shared/chunk-YNAFJ7EJ.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/properties._index": { id: "routes/properties._index", parentId: "root", path: "properties/_index", index: void 0, caseSensitive: void 0, module: "/build/routes/properties._index-CNYOCWMQ.js", imports: ["/build/_shared/chunk-WO4U5INL.js", "/build/_shared/chunk-JXUZXZTZ.js", "/build/_shared/chunk-BIWEWJ6N.js", "/build/_shared/chunk-YNAFJ7EJ.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "27d460be", hmr: void 0, url: "/build/manifest-27D460BE.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_headers: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/properties._index": {
    id: "routes/properties._index",
    parentId: "root",
    path: "properties/_index",
    index: void 0,
    caseSensitive: void 0,
    module: properties_index_exports
  },
  "routes/properties.$id": {
    id: "routes/properties.$id",
    parentId: "root",
    path: "properties/:id",
    index: void 0,
    caseSensitive: void 0,
    module: properties_id_exports
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: contact_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "_index",
    index: void 0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
