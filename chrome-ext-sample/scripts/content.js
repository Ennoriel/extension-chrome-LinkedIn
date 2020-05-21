chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "getName") {
            var name = $("h1.searchable").text() ? $("h1.searchable").text() : $("li.inline.t-24.t-black.t-normal.break-words").text().trim();
            sendResponse(name ? {"name": name} : {"name": "the faceless man"});
        }
    }
);

// , "https://www.linkedin.com/*", "http://localhost:3042/*", "http://google.com/*"
