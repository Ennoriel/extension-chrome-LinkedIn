var tabDataStore = {};

chrome.tabs.onCreated.addListener(function (tab) {
    tabDataStore['tab_' + tab.id] = {};
});

chrome.tabs.onRemoved.addListener(function (tabId) {
    delete tabDataStore['tab_' + tabId];
});

chrome.runtime.onMessage.addListener(function(candidate,sender,sendResponse){
  if(candidate.action == 'getCandidates')
      sendResponse(tabDataStore['tab_' + candidate.tabId]);
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {action: "getName"}, response => handleDbSearch(response, tabId));
    }
})

function handleDbSearch(response, tabId) {
    if (response && response.name !== "the faceless man") {

    const parsedName = response.name.split(" ")
    const firstName = parsedName[0];
    const lastName = parsedName[parsedName.length - 1];

    fetch('http://localhost:3042/' + firstName + '/' + lastName, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }})
        .then(candidates => candidates.json())
        .then(candidates => tabDataStore['tab_' + tabId] = candidates);
      }
}
