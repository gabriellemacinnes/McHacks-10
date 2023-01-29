document.getElementById("sum_text").addEventListener('click', getCurrentTab);



async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  $.post("http://127.0.0.1:8000/app/url_parse",
    {
      url: tab.url,
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });

  document.getElementById('text').innerHTML = tab.url;
  return tab.url;
}


function get_text(value) {
  var hello = "some text"
  document.getElementById('text').innerHTML = url
}

