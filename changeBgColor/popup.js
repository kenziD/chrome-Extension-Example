'use strict'

function changeColor() {
    var changeBgBtn = document.querySelectorAll('.changeBg');
    for (var j = 0; j < changeBgBtn.length; j++) {
        (function(index) {
            changeBgBtn[index].onclick = function(e) {
                //why e.target.style.backgroundColor doeson't work
                var bgColor = getComputedStyle(e.target).backgroundColor
                chrome.tabs.executeScript(null, {
                    code: "document.body.style.backgroundColor='" + bgColor + "'"
                });
            }
        })(j);
    }
}

var colorIcon = document.querySelector('.colorLogo');
colorIcon.addEventListener("click", folderPaper);

function folderPaper() {
    var otherLi = document.querySelectorAll('.colorBtnList li:nth-child(n+2)');

    function animation1() {
        var animate = new Promise(function(resolve, reject) {
            otherLi[0].style.display = "block";
            window.setTimeout(function() {
                // this has to be add id .if add class,the preority are small then css3 li:nth-child selector.transition will not work
                otherLi[0].setAttribute("id", "display0deg");
                otherLi[0].addEventListener("transitionend", function() {
                    console.log("over");
                    resolve("end");
                });
            }, 100);

        });
        return animate
    }

    function animation2() {
        var animate = new Promise(function(resolve, reject) {
            otherLi[1].style.display = "block";
            window.setTimeout(function() {
                // this has to be add id .if add class,the preority are small then css3 li:nth-child selector.transition will not work
                otherLi[1].setAttribute("id", "display0deg");
                otherLi[1].addEventListener("transitionend", function() {
                    console.log("over");
                    resolve("end");
                });
            }, 5);

        });
        return animate
    }

    function animation3() {
        var animate = new Promise(function(resolve, reject) {
            otherLi[2].style.display = "block";
            window.setTimeout(function() {
                // this has to be add id .if add class,the preority are small then css3 li:nth-child selector.transition will not work
                otherLi[2].setAttribute("id", "display0deg");
                otherLi[2].addEventListener("transitionend", function() {
                    console.log("over");
                    resolve("end");
                });
            }, 5);

        });
        return animate
    }

    animation1().then(animation2).then(animation3);
}
var selectBtn = document.querySelector('.select');

var UIStyle = function() {};

UIStyle.prototype.set_started = function() {
    selectBtn.classList.add("capturing");
    selectBtn.innerHTML = "stop selecting";
}

UIStyle.prototype.set_stoped = function() {
    selectBtn.classList.remove("capturing");
    selectBtn.innerHTML = "start select";
}
var ui;

var getStatus = function() {
    chrome.runtime.sendMessage({
        action: "get_status"
    }, function(response) {
        if (response.recording) {
            ui.set_started();
        } else {
            ui.set_stoped();
        }
    });
}

function main() {
    selectBtn.addEventListener("click", function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            console.log("fasong");
            if (selectBtn.classList.contains("capturing")) {

                ui.set_stoped();
                chrome.runtime.sendMessage({
                    action: "stop"
                }, function(response) {
                    if (response.recording) {}
                });
                chrome.tabs.sendMessage(tabs[0].id, {
                    selecting: "stop"
                }, function(response) {
                    if (response.farewell == "goodbye") {}
                });
            } else {
                ui.set_started();
                chrome.runtime.sendMessage({
                    action: "start"
                }, function(response) {
                    if (response.recording) {}
                });
                chrome.tabs.sendMessage(tabs[0].id, {
                    selecting: "start"
                }, function(response) {
                    console.log(response.farewell);
                    if (response.farewell == "letsgo") {}
                });
            }
        });
    });
}
window.onload = function() {
    ui = new UIStyle();
    getStatus();
    changeColor();
    main();
}
