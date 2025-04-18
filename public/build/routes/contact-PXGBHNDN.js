import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from "/build/_shared/chunk-YNAFJ7EJ.js";
import {
  __toESM,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-7HYSD3WE.js";

// app/routes/contact.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
var meta = () => {
  return [
    { title: "Contact Us | Luxury Estates" },
    { name: "description", content: "Get in touch with our team to inquire about our luxury vacation rentals or to book your next stay." }
  ];
};
function Contact() {
  const [formData, setFormData] = (0, import_react.useState)({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = (0, import_react.useState)({});
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = "Name is required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject)
      newErrors.subject = "Please select a subject";
    if (!formData.message.trim())
      newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm())
      return;
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 5e3);
    }, 1500);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-off-white py-16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-4xl md:text-5xl font-arioso text-deep-green mb-8 text-center", children: "Contact Us" }, void 0, false, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 76,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaEnvelope, { className: "text-deep-green text-xl" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 81,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 80,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Email Us" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Our team is here to help with any questions" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 84,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "mailto:info@luxuryestates.com", className: "text-terracotta hover:underline", children: "info@luxuryestates.com" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 85,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaPhone, { className: "text-deep-green text-xl" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 90,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Call Us" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 92,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Speak directly with our concierge team" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "tel:+18005551234", className: "text-terracotta hover:underline", children: "+1 (800) 555-1234" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 94,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-14 h-14 bg-deep-green/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FaMapMarkerAlt, { className: "text-deep-green text-xl" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 99,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "text-xl font-arioso text-deep-green mb-2", children: "Visit Us" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 101,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-600 mb-4", children: "Our headquarters location" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 102,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("address", { className: "not-italic text-terracotta", children: [
          "123 Luxury Lane",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 104,
            columnNumber: 32
          }, this),
          "Beverly Hills, CA 90210"
        ] }, void 0, true, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 78,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl font-arioso text-deep-green mb-6", children: "Send Us a Message" }, void 0, false, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 111,
        columnNumber: 13
      }, this),
      isSuccess && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium", children: "Thank you for your message!" }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 115,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm mt-1", children: "We've received your inquiry and will get back to you shortly." }, void 0, false, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 116,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 114,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", className: "block text-gray-700 font-medium mb-1", children: "Your Name*" }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 123,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
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
              false,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 124,
                columnNumber: 19
              },
              this
            ),
            errors.name && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.name }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 133,
              columnNumber: 35
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 122,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", className: "block text-gray-700 font-medium mb-1", children: "Email Address*" }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 137,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
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
              false,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 138,
                columnNumber: 19
              },
              this
            ),
            errors.email && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.email }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 147,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 136,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "phone", className: "block text-gray-700 font-medium mb-1", children: "Phone Number" }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 151,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
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
              false,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 152,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 150,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "subject", className: "block text-gray-700 font-medium mb-1", children: "Subject*" }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 164,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "select",
              {
                id: "subject",
                name: "subject",
                value: formData.subject,
                onChange: handleChange,
                className: `w-full p-3 border rounded-md ${errors.subject ? "border-red-500" : "border-gray-300"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select a subject" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 172,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "booking", children: "Property Booking" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 173,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "inquiry", children: "Property Inquiry" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 174,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "support", children: "Customer Support" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 175,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "partnership", children: "Partnership Opportunity" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 176,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "other", children: "Other" }, void 0, false, {
                    fileName: "app/routes/contact.tsx",
                    lineNumber: 177,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "app/routes/contact.tsx",
                lineNumber: 165,
                columnNumber: 19
              },
              this
            ),
            errors.subject && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.subject }, void 0, false, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 179,
              columnNumber: 38
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 163,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 121,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "message", className: "block text-gray-700 font-medium mb-1", children: "Message*" }, void 0, false, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
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
            false,
            {
              fileName: "app/routes/contact.tsx",
              lineNumber: 185,
              columnNumber: 17
            },
            this
          ),
          errors.message && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-red-500 text-sm mt-1", children: errors.message }, void 0, false, {
            fileName: "app/routes/contact.tsx",
            lineNumber: 194,
            columnNumber: 36
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/contact.tsx",
          lineNumber: 183,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "bg-deep-green hover:bg-terracotta text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center",
            disabled: isSubmitting,
            children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }, void 0, false, {
                  fileName: "app/routes/contact.tsx",
                  lineNumber: 205,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }, void 0, false, {
                  fileName: "app/routes/contact.tsx",
                  lineNumber: 206,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/contact.tsx",
                lineNumber: 204,
                columnNumber: 21
              }, this),
              "Sending..."
            ] }, void 0, true, {
              fileName: "app/routes/contact.tsx",
              lineNumber: 203,
              columnNumber: 19
            }, this) : "Send Message"
          },
          void 0,
          false,
          {
            fileName: "app/routes/contact.tsx",
            lineNumber: 197,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/routes/contact.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/contact.tsx",
      lineNumber: 110,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 75,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 74,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/contact.tsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
export {
  Contact as default,
  meta
};
//# sourceMappingURL=/build/routes/contact-PXGBHNDN.js.map
