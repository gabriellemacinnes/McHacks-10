const highlightButton = document.getElementById('toggle-button');
highlightButton.addEventListener('click', getCurrentURL);

var summary = "this is the summary"
var url = "www.testwebsite.com"
//document.getElementById("myText").innerHTML = url;

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
      alert("Id: " + id + "\nStatus: " + status);
      cur_id = id;
    });
}


async function fetchData() {
  $.get("http://127.0.0.1:8000/app/check_sum/" + cur_id.toString(),
  function(status){
    alert("Status: " + status);
  });
  window.setInterval(first, 10000);
}
//fetchData();


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