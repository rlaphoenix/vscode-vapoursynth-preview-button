// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
	window,
	commands,
	ExtensionContext,
} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext): void {
	console.log('Congratulations, your extension "VapourSynth Preview Button" is now active!');

	const open = commands.registerCommand('VapourSynthPreview.open', () => {
        const editor = window.activeTextEditor;
        if (!editor) {
            void window.showInformationMessage('No file is currently open.');
            return;
        }

        const document = editor.document;
        const filePath = document.uri.fsPath;
        const fileDir = ((/(.*)[/\\]/.exec(filePath)) ?? [null, ''])[1];

		// Note:
		// - If terminal is in such a state where you cant type, this will fail.
		//   For example if the terminal has ended and asking you to press any key to close.
		// - If the terminal already has something running, it will act like it did nothing
		//   until the active task finishes, and it will then run. This would be unwanted
		//   behavior.
		// - Opening new terminals every time would solve all of these issues, but new
		//   terminals for every preview call will be annoying.
		// - Sanitization of the sendText calls is likely to be a failure point, could possibly
		//   inject shell commands with a specially crafted file or directory name.
        let terminal = window.activeTerminal;
        if (!terminal) {
            terminal = window.createTerminal(`VapourSynth Preview`);
        }
        terminal.show();
        terminal.sendText(`cd "${fileDir}"`);
        terminal.sendText(`vse-previewer "${filePath}"`);
	});

	context.subscriptions.push(open);
}

// this method is called when your extension is deactivated
export function deactivate(): void {
	// placeholder
}
