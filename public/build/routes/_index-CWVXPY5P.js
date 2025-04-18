import {
  PropertyCard
} from "/build/_shared/chunk-JXUZXZTZ.js";
import {
  getProperties
} from "/build/_shared/chunk-BIWEWJ6N.js";
import {
  Link
} from "/build/_shared/chunk-4LG37ZVK.js";
import {
  FaArrowRight
} from "/build/_shared/chunk-YNAFJ7EJ.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-7HYSD3WE.js";

// app/components/Hero.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Hero() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative h-screen", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "img",
      {
        src: "public/images/IMG_8545.png",
        alt: "Luxury Estate Villa Paradiso",
        className: "w-full h-full object-cover"
      },
      void 0,
      false,
      {
        fileName: "app/components/Hero.tsx",
        lineNumber: 5,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "app/components/Hero.tsx",
      lineNumber: 4,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "img",
      {
        src: "/images/logo-white.png",
        alt: "Luxury Estates",
        className: "h-16"
      },
      void 0,
      false,
      {
        fileName: "app/components/Hero.tsx",
        lineNumber: 12,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "app/components/Hero.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Hero.tsx",
    lineNumber: 3,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => {
  return [
    { title: "Luxury Estates - Exceptional Vacation Rentals" },
    { name: "description", content: "Discover our curated collection of luxury vacation rentals in the world's most coveted destinations." }
  ];
};
function Index() {
  const properties = getProperties();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Hero, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("section", { id: "featured-properties", className: "py-16 bg-off-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-4xl font-arioso text-deep-green mb-4", children: "Featured Properties" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 27,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Explore our handpicked selection of extraordinary homes in the world's most desirable locations" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: properties.map((property) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(PropertyCard, { property }, property.id, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 35,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center mt-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        Link,
        {
          to: "/properties",
          className: "inline-flex items-center gap-2 bg-deep-green hover:bg-terracotta text-white font-medium px-6 py-3 rounded-md transition-colors duration-300",
          children: [
            "View All Properties",
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FaArrowRight, {}, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 45,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 40,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("section", { className: "py-16 bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-4xl font-arioso text-deep-green mb-4", children: "Experience Luxury Like Never Before" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 mb-6", children: "At Luxury Estates, we believe that extraordinary experiences begin with exceptional homes. Our curated collection of properties represents the pinnacle of luxury in the world's most coveted destinations." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 57,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 mb-6", children: "Each home in our portfolio is personally selected for its unique character, stunning location, and unparalleled amenities. From beachfront villas to mountain retreats, our properties offer the perfect setting for unforgettable vacations." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 60,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-gray-600 mb-8", children: "Our dedicated concierge team ensures that every aspect of your stay exceeds expectations, from personalized check-ins to arranging private chefs, spa services, and exclusive experiences." }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 63,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
          Link,
          {
            to: "/about",
            className: "inline-flex items-center gap-2 text-deep-green hover:text-terracotta font-medium transition-colors duration-300",
            children: [
              "Learn More About Us",
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FaArrowRight, {}, void 0, false, {
                fileName: "app/routes/_index.tsx",
                lineNumber: 71,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 66,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 55,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/ODJBFsx.jpeg",
              alt: "Luxury Interior",
              className: "w-full h-64 object-cover rounded-lg"
            },
            void 0,
            false,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 77,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/cZMdrKF.jpeg",
              alt: "Mountain View",
              className: "w-full h-40 object-cover rounded-lg"
            },
            void 0,
            false,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 82,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 76,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "space-y-4 pt-8", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/1GdDbqi.jpeg",
              alt: "Pool View",
              className: "w-full h-40 object-cover rounded-lg"
            },
            void 0,
            false,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 89,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "img",
            {
              src: "https://i.imgur.com/754i92z.jpeg",
              alt: "Ocean View",
              className: "w-full h-64 object-cover rounded-lg"
            },
            void 0,
            false,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 94,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 75,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 54,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 53,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("section", { className: "py-16 bg-deep-green text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-4xl font-arioso mb-4", children: "What Our Guests Say" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-off-white/80 max-w-2xl mx-auto", children: "Hear from guests who have experienced the exceptional service and luxury of our properties" }, void 0, false, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 120,
            columnNumber: 21
          }, this) }, i, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 119,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "mb-4 italic", children: '"Our stay at Villa Paradiso exceeded all expectations. The views were breathtaking, the home was immaculate, and the concierge service made everything effortless. Truly a once-in-a-lifetime experience."' }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 124,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "font-medium", children: "Sarah & James" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 128,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "New York, NY" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 129,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 116,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 137,
            columnNumber: 21
          }, this) }, i, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 136,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 134,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "mb-4 italic", children: `"Alpine Retreat was the perfect setting for our family reunion. The attention to detail in the home was remarkable, and having ski-in/ski-out access made our vacation truly special. We're already planning our return."` }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 141,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "font-medium", children: "The Thompson Family" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 145,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "Chicago, IL" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 146,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 144,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 133,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-white/10 p-6 rounded-lg backdrop-blur-sm", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center gap-2 text-terracotta mb-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 154,
            columnNumber: 21
          }, this) }, i, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 153,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 151,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "mb-4 italic", children: '"Tropical Haven was pure paradise. Waking up to the sound of waves and having direct beach access was magical. The property manager went above and beyond to make our honeymoon unforgettable."' }, void 0, false, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 158,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "font-medium", children: "Michael & Emma" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 162,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "text-sm text-off-white/70", children: "London, UK" }, void 0, false, {
              fileName: "app/routes/_index.tsx",
              lineNumber: 163,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 161,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 107,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 106,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("section", { className: "py-16 bg-off-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "bg-terracotta rounded-xl p-8 md:p-12 text-white text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h2", { className: "text-3xl md:text-4xl font-arioso mb-4", children: "Ready to Experience Luxury?" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 174,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "max-w-2xl mx-auto mb-8 text-white/90", children: "Book your dream vacation today and discover why our guests return year after year" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 175,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        Link,
        {
          to: "/properties",
          className: "inline-block bg-white text-deep-green hover:bg-deep-green hover:text-white font-medium px-8 py-3 rounded-md transition-colors duration-300",
          children: "Browse Properties"
        },
        void 0,
        false,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 178,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 173,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 172,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 171,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-CWVXPY5P.js.map
