const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: ""
	});
});

chrome.commands.onCommand.addListener(async function(command) {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	// Retrieve the action badge to check if the extension is 'ON' or 'OFF'
	const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
	// Next state will always be the opposite
	const nextState = prevState === 'Focus' ? '' : 'Focus'

	// Set the action badge to the next state
	await chrome.action.setBadgeText({
	text: nextState,
	});
	if (nextState === "Focus") {
	// Insert the CSS file when the user turns the extension on
	await chrome.scripting.insertCSS({
		files: ["focus.css"],
		target: { tabId: tab.id },
	});
	} else if (nextState === "") {
	// Remove the CSS file when the user turns the extension off
	await chrome.scripting.removeCSS({
		files: ["focus.css"],
		target: { tabId: tab.id },
	});
	}
    
});

var serverhost = 'http://127.0.0.1:8000';

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {


			var url = serverhost + '/app/get_wiki_summary/?topic='+ encodeURIComponent(request.topic) ;

			console.log(url);

			//var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"
			fetch(url)
			.then(response => response.json())
			.then(response => sendResponse({farewell: response}))
			.catch(error => console.log(error))

			return true;  // Will respond asynchronously.

	});

