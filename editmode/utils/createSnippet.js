module.exports = (settings, data) => {
  if (data) {
    let { identifier, content, chunk_type, collection } = data;
    let snippet =
      settings.em_snippet_templates[settings.em_default_snippet_template];
    snippet = snippet.replace("{identifier}", identifier);
    snippet = snippet.replace("{chunk_type}", chunk_type);
    snippet = snippet.replace("{content}", content);
    snippet = snippet.replace("{collection}", collection);
    return snippet;
  }
};
