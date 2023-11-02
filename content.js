document.getElementById('trigger').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      function getContent() {
          let content = document.querySelector(".container-fluid");
          
          if (!content.innerText) return;
          content = content.innerText;
          
          const textArea = document.createElement("textarea");
          textArea.value = content;
        
          document.body.appendChild(textArea);
        
          textArea.select();
        
          document.execCommand("copy");
        
          document.body.removeChild(textArea);
      };

      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getContent,
      });
  });
});
