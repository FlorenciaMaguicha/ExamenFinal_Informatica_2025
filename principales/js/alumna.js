
window.onload = function () {
    var audio = document.getElementById("audio");
    audio.play();
};

Vue.createApp({
    data() {
        return {
            isFlipped: false
        };
    }
}).mount("#app");