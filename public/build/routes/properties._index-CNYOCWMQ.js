import {
  require_node
} from "/build/_shared/chunk-WO4U5INL.js";
import {
  PropertyCard
} from "/build/_shared/chunk-JXUZXZTZ.js";
import "/build/_shared/chunk-BIWEWJ6N.js";
import {
  useLoaderData
} from "/build/_shared/chunk-4LG37ZVK.js";
import "/build/_shared/chunk-YNAFJ7EJ.js";
import {
  __toESM,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-7HYSD3WE.js";

// app/routes/properties._index.tsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => {
  return [
    { title: "Our Properties | Luxury Estates" },
    { name: "description", content: "Browse our collection of luxury vacation rentals in the world's most coveted destinations." }
  ];
};
function Properties() {
  const { properties } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-off-white py-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-4", children: "Our Luxury Properties" }, void 0, false, {
        fileName: "app/routes/properties._index.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Discover our handpicked collection of extraordinary homes in the world's most desirable locations" }, void 0, false, {
        fileName: "app/routes/properties._index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: properties.map((property) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PropertyCard, { property }, property.id, false, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 35,
      columnNumber: 13
    }, this)) }, void 0, false, {
      fileName: "app/routes/properties._index.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/properties._index.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/properties._index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}
export {
  Properties as default,
  meta
};
//# sourceMappingURL=/build/routes/properties._index-CNYOCWMQ.js.map
