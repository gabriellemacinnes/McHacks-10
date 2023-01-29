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
  //document.getElementById('pagetitle').innerHTML = tab.url;
  $.ajax({
    url: "/cgi-bin/hello.py",
    type: "POST",
    data: {"text" : message},
    success: function(response){
            $("#div").html(response);
    }
});
  return tab.url;
}
$.ajax({
  type: "POST",
  url: "scrape.py",
  data: { param: text}
  }).done(function(o) {
      console.log(data);
      console.log(text);
  });
