window.onload = function() {

    function skew_pics() {
        for (let pic of document.querySelectorAll(".song_pic")) {
            pic.style.marginLeft = Math.random() * 30 + "px"
            pic.style.marginTop = Math.random() * 30 + "px"
        }
    }

    formatting = [
        {
            "open": [/\[/gi, "<span class='chord'>"],
            "close": [/]/gi, "</span>"]
        },
        {
            "open": [/\(/gi, "<i class='shout'>"],
            "close": [/\)/gi, "</i>"]
        },
        {
            "open": [/maj7/gi, "△7"],
            "close": [/maj7/gi, "△7"]
        }
        
    ]

    function formatText(text) {
        for (let delimiters of formatting) {
            text = text.replaceAll(new RegExp(delimiters["open"][0]),delimiters["open"][1])
            text = text.replaceAll(new RegExp(delimiters["close"][0]),delimiters["close"][1])
        }
        return text
    }

    async function fetchSong(song) {
            try {
                const response = await fetch('songs/' + song);
                const text = await response.text()
                return text
            } catch (error) {
                console.log("fetch failed")
                console.log(error)
            }
    }

    async function grab_songs() {
        const response = await fetch('./songs');
        const text = await response.text()
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a');
        let song_files = Array.from(links).map(link => link.getAttribute('href'));

        song_files = song_files.sort(() => Math.random() - 0.5); // Shuffle the array
        const ankIndex = song_files.indexOf('ank.txt');
        if (ankIndex > -1) {
            song_files.splice(ankIndex, 1); // Remove 'ank.txt' from its current position
            song_files.unshift('ank.txt'); // Add 'ank.txt' to the beginning
        }

        songs_navbar = document.getElementById("next_top_link")
        songz = document.getElementById("songz")
        
        domParser = new DOMParser
    
        for(let song_file of song_files) {
            fetchSong(song_file).then((song) => {
                images = ''
                song_meta = song.split('\n').slice(0,2)
                song_content = song.split('\n').slice(2,song.length).join('\n')
                
                if(song_meta[1][0] == 'I') {
                    images = song_meta[1].split(' ').slice(1).filter(n => n)
                    images = images.map((img) => {
                        img_id = ''
                        if(img.slice(0,4) != 'http') {
                            img_id = img.split('_')[0]
                            img = img.split('_').slice(1).join('_')
                        }
                        return `<img loading="lazy" id="${img_id}" class="song_pic" src="${img}">`
                    }).join('');
                }

                song_title = song_file.split('.txt')[0]

                const parsedDocument = domParser.parseFromString(
                `<div class="song" id="${song_title}">
                    <div class="song_title"><a class="song_link" href="${'/songs/' + song_file}" target="_blank">${song_meta[0]}</a></div>
                    <div class="brochure">
                        <pre class="lyrics">
                        
                        ${formatText(song_content)}</pre>
                        <div class="flics">
                            ${images}
                        </div>
                    </div>
                    <hr/>
                </div>`, 'text/html');
                songz.appendChild(parsedDocument.body.firstChild);

                foo = document.createElement("a")
                foo.setAttribute("href", "#" + song_title)
                foo.innerHTML = song_meta[0]
                songs_navbar.appendChild(foo)
            })
        }
        
        songz.style.display = "block"
        document.getElementById("top_gun").style.display = "flex"
        skew_pics()
    }    

    grab_songs()
}