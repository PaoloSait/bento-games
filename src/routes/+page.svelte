<script>
    import GameWidget from "$lib/components/GameWidget.svelte";
    import Greeting from "$lib/components/Greeting.svelte";
</script>

<body class="flex flex-col items-center bg-[#f0ebe6] w-full h-full">
    <div class="flex flex-col gap-4 py-8 max-w-screen-lg md:w-[66vw] w-[84vw]">
        <Greeting />
        <div class="flex flex-wrap">
            <GameWidget
                color={"bg-connections-purple"}
                href={"https://www.nytimes.com/games/connections"}
                imgRef={"https://www.nytimes.com/games-assets/v2/assets/icons/connections.svg"}
                gameName={"Connections"}
                frequency={"Daily"}
                logo={"https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-strands"}
                href={"https://www.nytimes.com/games/strands"}
                imgRef={"https://www.nytimes.com/games/prototype/dist/strands100px.ea3b90d2.svg"}
                gameName={"Strands"}
                frequency={"Daily"}
                logo={"https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={"https://www.nytimes.com/crosswords/game/mini"}
                imgRef={"https://www.nytimes.com/games-assets/v2/assets/icons/mini.svg"}
                gameName={"The Mini"}
                frequency={"Daily"}
                inverseTag={true}
                logo={"https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={"https://www.washingtonpost.com/crossword-puzzles/mini-meta/"}
                imgRef={"https://wapo.amuselabs.com/minimeta/images/thumbnail/crossword_thumb_black.svg"}
                gameName={"Mini Meta"}
                frequency={"Daily"}
                inverseTag={true}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-gray-300"}
                href={"https://www.washingtonpost.com/crossword-puzzles/sunday-evan-birnholz/"}
                imgRef={"https://wapo.amuselabs.com/minimeta/images/thumbnail/crossword_thumb_black.svg"}
                gameName={"Sunday Crossword"}
                smallText={true}
                frequency={"Weekly"}
                inverseTag={true}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#e3cebd]"}
                href={"https://bandle.app/"}
                imgRef={"https://pbs.twimg.com/profile_images/1660704099191386112/tG2V4gWs_400x400.jpg"}
                gameName={"Bandle"}
                frequency={"Daily"}
                inverseTag={true}
            ></GameWidget>
            <GameWidget
                color={"bg-black"}
                href={"https://cinequote.net/"}
                imgRef={"https://cinequote.net/circle.png"}
                gameName={"Cinequote"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#eef510]"}
                href={"https://popidle.the-sound.co.uk/guess-the-album"}
                imgRef={"/popidle_logo.png"}
                gameName={"Popidle"}
                frequency={"Daily"}
                inverseTag={true}
            ></GameWidget>
            <GameWidget
                color={"bg-[#31302e]"}
                href={"https://travle.earth"}
                imgRef={"https://travle.earth/assets/apple-touch-icon-1024x1024.png"}
                gameName={"Travle"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#bc1d1d]"}
                href={"https://framed.wtf/"}
                imgRef={"https://framed.wtf/icons/apple-touch-icon.png"}
                gameName={"Framed"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#1b1b1b]"}
                href={"https://episode.wtf/"}
                imgRef={"https://episode.wtf/icons/apple-touch-icon.png"}
                gameName={"Episode"}
                frequency={"Weekly"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#ff7070]"}
                href={"https://www.techyonic.co/swiftle"}
                imgRef={"https://www.techyonic.co/favicon.ico"}
                gameName={"Swiftle"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
            ></GameWidget>
            <GameWidget
                color={"bg-[#d6e8ff]"}
                href={"https://www.minutecryptic.com/"}
                imgRef={"https://www.minutecryptic.com/icon.ico?73f70e8b5bf80676"}
                gameName={"Minute Cryptic"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
            ></GameWidget>

            

        </div>
    </div>
</body>
