import { defineConfig } from "tinacms";

// TinaCloud reads these from your Netlify env vars in production.
// Get clientId from app.tina.io after creating a project there;
// the token is a Content token generated in the same dashboard.
const branch =
  process.env.HEAD || process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // --- Site-wide settings: phone, email, socials -----------------
      {
        name: "siteSettings",
        label: "Site Settings (phone, email, socials)",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "phone", label: "Phone (display)" },
          { type: "string", name: "phoneHref", label: "Phone link (tel:+254...)" },
          { type: "string", name: "email", label: "Email address" },
          { type: "string", name: "whatsappUrl", label: "WhatsApp link" },
          { type: "string", name: "linkedinUrl", label: "LinkedIn URL" },
          { type: "string", name: "instagramUrl", label: "Instagram URL" },
          { type: "string", name: "twitterUrl", label: "Twitter / X URL" },
          { type: "string", name: "threadsUrl", label: "Threads URL" },
        ],
      },

      // --- About page --------------------------------------------------
      {
        name: "aboutPage",
        label: "About Page",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero eyebrow" },
          { type: "string", name: "heroHeading", label: "Hero heading" },
          { type: "string", name: "heroParagraph", label: "Hero paragraph", ui: { component: "textarea" } },
          { type: "string", name: "journeyHeading", label: "Journey heading" },
          { type: "string", name: "journeyParagraph1", label: "Journey paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "journeyParagraph2", label: "Journey paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "skills", label: "Core skills", list: true },
          {
            type: "object",
            name: "experience",
            label: "Professional experience",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.role || "New role" }) },
            fields: [
              { type: "string", name: "role", label: "Role title" },
              { type: "string", name: "company", label: "Company" },
              { type: "image", name: "logo", label: "Company logo" },
              { type: "string", name: "dateRange", label: "Date range" },
              { type: "string", name: "bullets", label: "Bullet points", list: true, ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "educationDegree", label: "Degree" },
          { type: "string", name: "educationSchool", label: "School" },
          { type: "string", name: "approachEyebrow", label: "Approach eyebrow" },
          { type: "string", name: "approachHeading", label: "Approach heading" },
          { type: "string", name: "approachParagraph", label: "Approach paragraph", ui: { component: "textarea" } },
          { type: "string", name: "profileName", label: "Profile name" },
          { type: "string", name: "profileTagline", label: "Profile tagline" },
          { type: "image", name: "profilePhoto", label: "Profile photo" },
          { type: "string", name: "aboutCopyHeading", label: "About copy heading" },
          { type: "string", name: "aboutCopyParagraphs", label: "About copy paragraphs", list: true, ui: { component: "textarea" } },
          {
            type: "object",
            name: "values",
            label: "Values",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "New value" }) },
            fields: [
              { type: "string", name: "emoji", label: "Emoji" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "text", label: "Text" },
            ],
          },
          { type: "string", name: "philosophyEyebrow", label: "Philosophy eyebrow" },
          { type: "string", name: "philosophyHeading", label: "Philosophy heading" },
          {
            type: "object",
            name: "philosophyCards",
            label: "Philosophy cards",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "New card" }) },
            fields: [
              { type: "string", name: "emoji", label: "Emoji" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "text", label: "Text" },
            ],
          },
          { type: "string", name: "cvHeading", label: "CV section heading" },
          { type: "string", name: "cvText", label: "CV section text" },
        ],
      },

      // --- Services page -------------------------------------------------
      {
        name: "servicesPage",
        label: "Services Page",
        path: "content/services",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero eyebrow" },
          { type: "string", name: "heroHeading", label: "Hero heading" },
          { type: "string", name: "heroParagraph", label: "Hero paragraph", ui: { component: "textarea" } },
          {
            type: "object",
            name: "services",
            label: "Services",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "New service" }) },
            fields: [
              { type: "string", name: "number", label: "Number (e.g. 01)" },
              { type: "string", name: "icon", label: "Emoji icon" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "ctaHeading", label: "CTA heading" },
          { type: "string", name: "ctaText", label: "CTA text", ui: { component: "textarea" } },
          { type: "string", name: "ctaButtonLabel", label: "CTA button label" },
        ],
      },
    ],
  },
});
