function summarize() {
    document.getElementById("content").innerHTML = "whatever";
}

const highlightButton = document.getElementById('toggle-button');

highlightButton.addEventListener('click', getCurrentURL);

var summary = "this is the summary"
var url = "www.testwebsite.com"
//document.getElementById("myText").innerHTML = url;

async function getCurrentURL() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  $.post("http://127.0.0.1:8000/app/url_parse",
  {
    url: tab.url,
  });

  alert("yay!")
}

function createSummary() {
  getCurrentURL();

  //document.getElementById('text').innerHTML = tab.url;

  const myWindow = window.open();
  myWindow.document.open();
  myWindow.document.write("<h3> Summary generated using Co:here</h3>");
  myWindow.document.write("from: ");
  myWindow.document.write(document.location.href);
  myWindow.document.write("<br>");
  myWindow.document.write(summary);
  myWindow.document.close();

  return tab.url;
  }