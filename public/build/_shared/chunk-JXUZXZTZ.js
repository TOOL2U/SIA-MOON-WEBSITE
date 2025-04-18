import {
  Link
} from "/build/_shared/chunk-4LG37ZVK.js";
import {
  FaBath,
  FaBed,
  FaRulerCombined,
  FaUsers
} from "/build/_shared/chunk-YNAFJ7EJ.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-7HYSD3WE.js";

// app/components/PropertyCard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function PropertyCard({ property }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Link,
    {
      to: `/properties/${property.id}`,
      className: "group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative h-64 overflow-hidden", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "img",
            {
              src: property.images[0],
              alt: property.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            },
            void 0,
            false,
            {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 16,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-white font-medium text-lg", children: [
            "$",
            property.price,
            " / night"
          ] }, void 0, true, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 22,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 21,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/PropertyCard.tsx",
          lineNumber: 15,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-5", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-2xl font-arioso text-deep-green mb-1", children: property.name }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 27,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-3", children: property.location }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 28,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-700 mb-4 line-clamp-2", children: property.shortDescription }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 30,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-wrap gap-4 text-sm text-gray-600", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaBed, { className: "text-deep-green" }, void 0, false, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 34,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                property.bedrooms,
                " Beds"
              ] }, void 0, true, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 35,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 33,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaBath, { className: "text-deep-green" }, void 0, false, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 38,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                property.bathrooms,
                " Baths"
              ] }, void 0, true, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 39,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaUsers, { className: "text-deep-green" }, void 0, false, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 42,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                property.maxGuests,
                " Guests"
              ] }, void 0, true, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 43,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 41,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaRulerCombined, { className: "text-deep-green" }, void 0, false, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 46,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
                property.squareFeet.toLocaleString(),
                " sq ft"
              ] }, void 0, true, {
                fileName: "app/components/PropertyCard.tsx",
                lineNumber: 47,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "app/components/PropertyCard.tsx",
              lineNumber: 45,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 32,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-5 pt-4 border-t border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "inline-block bg-deep-green text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 hover:bg-terracotta", children: "View Property" }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 52,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/components/PropertyCard.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/PropertyCard.tsx",
          lineNumber: 26,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "app/components/PropertyCard.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
}

export {
  PropertyCard
};
//# sourceMappingURL=/build/_shared/chunk-JXUZXZTZ.js.map
