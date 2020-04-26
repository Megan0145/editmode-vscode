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
    "editmode.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello VS CODE from EditMode!");
      var editor = vscode.window.activeTextEditor;
      if (!editor) {
        return; // No open text editor
      }
      let selection = editor.selection;
      let text = editor.document.getText(selection);

      vscode.workspace
        .openTextDocument(`${vscode.workspace.rootPath}/em.config.json`)
        .then((doc) => {
          let settings = JSON.parse(doc.getText());
		  console.log(settings);
		  
          let data = {
            bit: {
              content: text,
            },
            authentication_token: settings.em_authentication_token,
		  };
		  let params = Buffer.from(`${data}`, 'utf-8');
		  
		  axios.post("https://editmode.app/projects/prj_c5rcsvTmf2UA/chunks", params)
		  .then(res=> console.log(res))
		  .catch(err=> console.log(err))

        })
        .catch((err) => console.log(err));

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, `<Chunk />`);
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
