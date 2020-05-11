module.exports = (settings, data) => {
  if (data) {
    let { identifier, content} = data;
    let default_template = settings.em_default_snippet_template;
    let snippet = settings.em_snippet_templates[default_template];

    snippet = snippet.replace("{identifier}", identifier);

    if (default_template === "react") {
      snippet = snippet.replace("{content}", content);
    } else if (default_template === "rails_erb") {
      let shortened_original_content = content.substr(0,10) + "..";
      shortened_original_content.replace('"', '');  
      shortened_original_content.replace(',', '');
      snippet = snippet.replace("{label}", shortened_original_content);  
    }
    return snippet;
  }
};
