'use strict'

function changeColor() {
    var changeBgBtn = document.querySelectorAll('.changeBg');
    for (var j = 0; j < changeBgBtn.length; j++) {
        (function(index) {
            changeBgBtn[index].onclick = function(e) {
                //why e.target.style.backgroundColor doeson't work
                //because changeBg class doesnt have background color property.it is added by yellow/green/pink...so use getComputedStyle
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

    function animation(index) {
        var animate = new Promise(function(resolve, reject) {
            otherLi[index].style.display = "block";
            window.setTimeout(function() {
                // this has to be add id .if add class,the preority are small then css3 li:nth-child selector.transition will not work
                otherLi[index].setAttribute("id", "display0deg");
                otherLi[index].addEventListener("transitionend", function() {
                    console.log("over");
                    resolve(index+1);
                });
            }, 100);

        });
        return animate
    }

    animation(0).then(animation).then(animation)
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
