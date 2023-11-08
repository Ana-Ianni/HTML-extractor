document.getElementById('trigger1').addEventListener('click', () => { 
    extractContent("#trigger1");
});

document.getElementById('trigger2').addEventListener('click', () => { 
    extractContent("#trigger2");
});

function extractContent(trigger) { 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
  
        function getContent(trigger) {
            let content;
            
            if (trigger === "#trigger1") {
                content = document.querySelector(".container-fluid, .container");
            } else if (trigger === "#trigger2") {
                content = document.querySelector("#content, .container.responsivegrid:not(.root)");
            }

            if (!content.innerText || !content.innerText) return;
            content = content.innerText;
            
            const textArea = document.createElement("textarea");
            textArea.value = content;
          
            document.body.appendChild(textArea);
          
            textArea.select();
          
            document.execCommand("copy");
          
            document.body.removeChild(textArea);
  
            alert("Copied to clipboard! :)");
        };
  
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getContent,
            args: [trigger],
        });
    });
}
