javascript:( () => {
    if (typeof cjs == "undefined") {
        const d = document;
        const s = d.createElement('scr' + 'ipt');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/castjs/5.2.0/cast.js');
        s.setAttribute('data-cfasync', 'false');

        s.addEventListener('load', (e) => {
            console.log('Cast.js loaded', e);
            window.cjs = new Castjs();
            cast();
        });

        d.head.appendChild(s);
        console.log('Cast.js appended');
    }
    function stripHtml(html) {
       let tmp = document.createElement("div");
       tmp.innerHTML = html;
       return tmp.textContent || tmp.innerText || "";
    }
    function cast() {
        if (typeof cjs == "undefined") {
            console.log("Cast.js not loaded yet :(");
            return;
        }
        if (!cjs.available) {
            console.log('Castjs loaded, but casting not available');
            setTimeout(cast, 1000);
            return;
        }
        console.log('Casting available');

        const data = document.querySelector('[data-neo-player-list]').dataset;
        const src = data.neoPlayerSrc;
        const poster = document.location.origin + '/' + data.neoPlayerImg;
        const title = stripHtml(data.neoPlayerTitle);
        const description = stripHtml(data.neoPlayerSubtitle);

        console.log('Found the source at ' + src + ', casting!');

        cjs.cast(src, {
            poster: poster,
            title: title,
            description: description
        });
        console.log('Casting started');
    }
    cast();
})();