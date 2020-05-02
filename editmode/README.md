## EditMode for Visual Studio Code

EditMode for VSCode is a simple plugin which adds a shortcut to your workspace, allowing you to instantly convert content inside to chunks - it will take the text, send it to the Editmode API which returns an identifier, and replace it with an Editmode helper. Used in conjunction with Editmode.js, it allows one to very quickly convert an existing site to be fully editable by anyone in a short space of time.

## Installation

Install EditMode through Visual Studio Code's Marketplace.
Just open your extension manager and search for "EditMode".

## Usage

1: Once you have installed and enabled EditMode, create an empty file by the name of "em.config.json" in the root directory of your workspace.

2: Copy and paste the following into your new file;

```
{
    "em_authentication_token": "<YOUR_TOKEN_HERE>",
    "em_default_snippet_template": "react",
    "em_snippet_templates": {
      "rails_erb": "<%= chunk('{label}','{identifier}') %>",
      "react": 
        "<Chunk chunk_type='{chunk_type}' identifier='{identifier}' collection='{collection'>
           {content}
        </Chunk>"
    }
}
```

3: Replace the "em_authentication_token" with your own (this will be the authentication token for the particular project that you are working on. You can find this on your EditMode account). You may change the "em_default_snippet_template" from "react" to any of the other options in the "em_snippet_templates" at any time.

EditMode is now ready to use!

Select the text you'd like to replace and hit CMD+SHIFT+L to convert your content to a chunk. Alternatively, you can open the Command Palette (CMD+SHIFT+P) and select "EditMode: Create Chunk".
