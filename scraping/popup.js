document.getElementById("sum_text").addEventListener('click', get_text);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    tabs[0].url;     //url
    tabs[0].title;   //title
});

function get_text() {
  document.getElementById('pagetitle').innerHTML = window.title
}
