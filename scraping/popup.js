document.getElementById("sum_text").addEventListener('click', getCurrentTab);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    tabs[0].url;     //url
    tabs[0].title;   //title
});

function get_text() {
  var hello = "some text"
  document.getElementById('pagetitle').innerHTML = hello
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  document.getElementById('pagetitle').innerHTML = "hello";
  $.ajax({
    url: "../research_extension/app/views.py",
    type: "POST",
    data: {"text" : JSON.parse(tab.url)},
    success: function() {document.getElementById('pagetitle').innerHTML = "success";},
    failure: function() {document.getElementById('pagetitle').innerHTML = "failure";}
  });
  document.getElementById('pagetitle').innerHTML = tab.url;
  return tab.url;
}