// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const axios = require("axios");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "editmode" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "editmode.createChunk",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello VS CODE from EditMode!");

      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }

      // Grab the text user has selected
      let selection = editor.selection;
      let text = editor.document.getText(selection);

      // Load settings from em.config file
      vscode.workspace
        .openTextDocument(`${vscode.workspace.rootPath}/em.config.json`)
        .then((doc) => {
          let settings = JSON.parse(doc.getText());

          // Make API call to create new chunk
          let data = {
            bit: {
              content: text,
            },
            authentication_token: settings.em_authentication_token,
          };

          axios({
            method: "post",
            url: "https://www.editmode.app/api/v1/bits",
            data: data,
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mozilla/5.0",
            },
          })
            .then((res) => {
              let { identifier, content, chunk_type, collection } = res.data;
              // Grab the default snippet template from settings and replace with chunk data from response
              let snippet =
                settings.em_snippet_templates[
                  settings.em_default_snippet_template
                ];
              snippet = snippet.replace("{identifier}", identifier);
              snippet = snippet.replace("{chunk_type}", chunk_type);
              snippet = snippet.replace("{content}", content);
              snippet = snippet.replace("{collection}", collection);

              // Replace text selection in editor with new snippet
              editor.edit((editBuilder) => {
                editBuilder.replace(selection, snippet);
              });
            })
            .catch((err) => {
              console.log(err);
              vscode.window.showErrorMessage(
                `EditMode: We're sorry. Something went wrong trying to create a chunk. 
				Please make sure all details in your EditMode configuration file are accurate and try again.`
              );
            });
        })
        .catch(() => {
          vscode.window.showWarningMessage(
            `EditMode: Cannot find "em.config.json" file in root directory.`
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;

module.exports = {
  activate,
  deactivate,
};
