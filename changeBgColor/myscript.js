chrome.runtime.onMessage.addListener(
    function handleMessage(request, sender, sendResponse) {
        var addHighlight = function(e) {
            e.target.classList.add('my-highlight');
        }
        var removeHighlight = function(e) {
            e.target.classList.remove('my-highlight');
        }
        var addELement = function(e, color) {
            e.target.classList.remove('my-highlight');
            //cancle link jump when click
            e.preventDefault();
            e.target.style.backgroundColor = "#C7EDCC";
        }
        if (request.selecting == "start") {
            startHover();
        } else if (request.selecting == "stop") {
            stopHover();
        }

        function startHover() {
            sendResponse({
                farewell: "letsgo"
            });
            //原生js无法取消事件的监听。好奇怪。
            $(window).on("mouseover", addHighlight);
            $(window).on("mouseout", removeHighlight);
            $(window).on("click", addELement);
            // document.addEventListener("mouseover", addHighlight,false);
            // document.addEventListener("mouseout",removeHighlight,false);
            // document.addEventListener("click", addELement,false);
        }

        function stopHover() {
            sendResponse({
                farewell: "goodbye"
            });
            $(window).off("mouseover");
            $(window).off("mouseout");
            $(window).off("click");
            // document.removeEventListener("mouseover", addHighlight,false);
            // document.removeEventListener("mouseout", removeHighlight,false);
            // document.removeEventListener("click", addELement,false);
            // console.log("stoping");
        }
    });
