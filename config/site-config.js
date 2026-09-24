// Public settings only. Never put API keys or gated file URLs in this file.
export default {
  siteName: 'Maths, Visually Explained',
  siteUrl: 'https://uzairmajeed8623-cell.github.io/maths-visually-explained', // e.g. https://yourname.github.io/your-repo (no trailing slash)
  contactEmail: '',
  youtubeChannel: '',
  calendlyUrl: '', // CALENDLY_URL: your https://calendly.com/... event URL
  tutor: { name: 'Uzair Majeed', photo: '', photoAlt: '', academicBackground: 'Ms Physics', research: '', experience: '', examBoards: '', testimonials: [] },
  mailerLite: {
    accountId: '2655165', // Loads MailerLite Universal once in every page head.
    // Paste the complete HTML form from MailerLite into formHtml. Keep its action,
    // hidden provider inputs, scripts, CAPTCHA, and consent controls intact.
    // MAILERLITE_FORM_CODE_HERE — this template is reused for every resource.
    formHtml: '',
    diagnosticFormHtml: '',
    // Optional form overrides; keys match worksheet.mailerLiteId in resources.json.
    resourceForms: {
      cosine_rule: '<div class="ml-embedded" data-form="g4crXY"></div>'
    },
    resourceField: 'fields[resource_requested]', // MAILERLITE_RESOURCE_FIELD
    sourceField: 'fields[source]',
    videoField: 'fields[youtube_video]'
  }
};
