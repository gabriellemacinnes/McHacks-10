function summarize() {
    document.getElementById("content").innerHTML = "whatever";
}

const highlightButton = document.getElementById('toggle-button');

highlightButton.addEventListener('click', createSummary);

var summary = "this is the summary"
var url = "www.testwebsite.com"
document.getElementById("myText").innerHTML = url;
function createSummary() {
    const myWindow = window.open();
    myWindow.document.open();
    myWindow.document.write("<h3> Summary generated using Co:here</h3>");
    myWindow.document.write("from: ");
    myWindow.document.write(document.location.href);
    myWindow.document.write("<br>");
    myWindow.document.write(summary);
    myWindow.document.close();
  }