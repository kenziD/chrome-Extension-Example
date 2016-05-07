'use strict'

function changeColor() {
    var changeBgBtn = document.querySelectorAll('.changeBg');
    console.log("li", changeBgBtn);
    var colorPlate = ["rgb(199, 237, 204)", "lightyellow", "#b2b2b2"];
    console.log(colorPlate[2]);
    for (var j = 0; j < changeBgBtn.length; j++) {
        (function(index) {
            changeBgBtn[index].onclick = function() {
                chrome.tabs.executeScript(null, {
                    code: "document.body.style.backgroundColor='" + colorPlate[index] + "'"
                });
            }
        })(j);
    }
}

var colorPlate = document.querySelector('.colorLogo');
colorPlate.addEventListener("click", function() {
    var otherLi = document.querySelectorAll('.colorBtnList li:nth-child(n+2)');
    var animation1 = new Promise(function(resolve, reject) {
        otherLi[0].style.display = "block";
        window.setTimeout(function() {
            otherLi[0].classList.add("display0deg");
            otherLi[0].addEventListener("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                console.log("over");
            });
        }, 100);

    });
    animation1.then(function(val) {
        console.log(val);
        otherLi[1].style.display = "block";
        window.setTimeout(function() {
            otherLi[1].style.transform = "rotate(0deg)";
        }, 10);
    });
    // for (var i = 0; i < otherLi.length; i++) {
    //     //如果用display:block就没有动画过度效果了。奇怪。要怎么实现呢？
    //     // otherLi[i].style.visibility = "visible";

    //     otherLi[i].style.display = "block";


    // }

});
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
