const highlightButton = document.getElementById('toggle-button');
highlightButton.addEventListener('click', getCurrentURL);

var cur_id;

async function getCurrentURL() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  $.post("http://127.0.0.1:8000/app/url_parse",
    {
      url: tab.url,
    },
    function(id, status){
      alert("Summary is being created");
      cur_id = id;
    });
}
