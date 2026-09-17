// Central place to configure the things you'll want to change before
// launch: the Calendly link, the form submission endpoint, and contact
// details used by the JS on the Need Assistant / Contact pages.
window.SITE_CONFIG = {
  siteName: "Is It Legal Sid?",
  legalName: "Sid Legal Advisory And Services LLP",
  founder: "Siddhant Pandey",
  email: "hello@isitlegalsid.com",
  phone: "+91 00000 00000",

  // Replace with your real Calendly event URL, e.g.
  // "https://calendly.com/siddhant-pandey/30min"
  calendlyUrl: "https://calendly.com/isitlegalsid/legal-consultation",

  // This static site has no backend of its own, so both forms below POST
  // to this endpoint. Point it at a form backend such as Formspree
  // (https://formspree.io) or Web3Forms (https://web3forms.com) — both
  // have a free tier and work with a plain fetch() POST like the one used
  // in js/need-assistant.js and js/contact.js. Leave blank to just log
  // submissions to the console during local development.
  formEndpoint: "https://formsubmit.co/ajax/akshitbalodhi69@gmail.com",

  practiceAreas: [
    { slug: "criminal-defense", name: "Criminal Defense" },
    { slug: "cyber-crime", name: "Cyber Crime & Digital Evidence" },
    { slug: "web3-blockchain", name: "Web3 & Blockchain Legal Advisory" },
    { slug: "startup-founder", name: "Startup & Founder Legal Advisory" },
    { slug: "corporate-law", name: "Corporate Law" },
    { slug: "contract-drafting", name: "Contract Drafting & Negotiations" },
    { slug: "international-legal", name: "International Legal Advisory" },
    { slug: "nri-legal", name: "NRI Legal Services" },
    { slug: "property-real-estate", name: "Property & Real Estate Disputes" },
    { slug: "family-matrimonial", name: "Family & Matrimonial Law" },
    { slug: "probate-wills", name: "Probate, Wills & Estate Planning" },
    { slug: "succession-inheritance", name: "Succession & Inheritance Law" },
    { slug: "intellectual-property", name: "Intellectual Property Rights" },
    { slug: "regulatory-compliance", name: "Regulatory Compliance" },
    { slug: "financial-fraud", name: "Financial & Fraud Investigations" },
    { slug: "arbitration-dispute", name: "Arbitration & Dispute Resolution" }
  ]
};
