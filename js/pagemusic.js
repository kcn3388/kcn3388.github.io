String.prototype.splice = function(start, newStr) {
    return this.slice(0, start) + newStr + this.slice(start);
};
var e = document.getElementById("musicid")
if (typeof (musicURL) == "undefined") {
    var musicURL
    var detailURL
    var musicRequest = new XMLHttpRequest;
    var dataRequest = new XMLHttpRequest;
    var musicData
    var detailData
    var httpsurl
}

musicURL = "//api.kcn3388.club/song/url?id=" + e.className
detailURL = "//api.kcn3388.club/song/detail?ids=" + e.className

musicRequest.onreadystatechange = function () {
    if (musicRequest.readyState == 4 && musicRequest.status == 200) {
        musicData = JSON.parse(musicRequest.responseText);
        // console.log(musicData.data[0]);
        httpsurl = musicData.data[0].url.splice(4, "s");
        // console.log(httpsurl)
    }
    dataRequest.open('GET', detailURL);
    dataRequest.send();
}

musicRequest.open('GET', musicURL);
musicRequest.send();

dataRequest.onreadystatechange = function () {
    if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        detailData = JSON.parse(dataRequest.responseText);
        // console.log(detailData.songs[0])
        const ap1 = new APlayer({
            element: document.getElementById('player1'),
            mini: false,
            autoplay: false,
            lrcType: false,
            mutex: true,
            preload: 'metadata',
            audio: [{
                name: detailData.songs[0].name,
                artist: detailData.songs[0].ar[0].name,
                url: httpsurl,
                cover: detailData.songs[0].al.picUrl,
                theme: '#ebd0c2'
            }]
        });
    }
}
