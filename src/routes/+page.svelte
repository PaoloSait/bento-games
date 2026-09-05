<script>
    import GameWidget from "$lib/components/GameWidget.svelte";
    import Greeting from "$lib/components/Greeting.svelte";
</script>

<body class="flex flex-col items-center bg-[#f0ebe6] dark:bg-[#14120f] w-full h-full">
    <div class="flex flex-col gap-4 py-8 max-w-screen-lg md:w-[66vw] w-[84vw]">
        <Greeting />
        <div class="flex flex-wrap">
            <GameWidget
                color={"bg-connections-purple"}
                href={"https://www.nytimes.com/games/connections"}
                darkColor={"dark:bg-[#3b3178]"}
                imgRef={"https://www.nytimes.com/games-assets/v2/assets/icons/connections.svg"}
                gameName={"Connections"}
                frequency={"Daily"}
                logo={"https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-gradient-to-r from-[#df8e33] via-[#be2b23] to-[#be2c25]"}
                href={"https://www.washingtonpost.com/news-quiz/?itid=sn_crosswords%20&%20games_3"}
                darkColor={"dark:from-[#7a4c1c] dark:via-[#6b1813] dark:to-[#6b1a15]"}
                imgRef={"https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNV9hX3N0dWRpb19zaG90X29mX2RvZ193YXZpbmdfaW1hZ2VzZnVsbF9ib2R5X2lzb185ZGZhMTMwMS0xZTJhLTQ2Y2UtOWM5Yy0yNzFkZDJlM2Y3ZmEucG5n.png"}
                gameName={"On the Record"}
                frequency={"Weekly"}
                nameColor={"text-white"}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={"https://www.nytimes.com/crosswords/game/mini"}
                darkColor={"dark:bg-[#26241f]"}
                darkImgInvert={true}
                imgRef={"https://www.nytimes.com/games-assets/v2/assets/icons/mini.svg"}
                gameName={"The Mini"}
                frequency={"Daily"}
                inverseTag={true}
                logo={"https://1000logos.net/wp-content/uploads/2017/04/Symbol-New-York-Times.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={"https://www.washingtonpost.com/crossword-puzzles/mini-meta/"}
                darkColor={"dark:bg-[#26241f]"}
                darkImgInvert={true}
                imgRef={"/crossword-grid.svg"}
                gameName={"Mini Meta"}
                frequency={"Daily"}
                inverseTag={true}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-gray-300"}
                href={"https://www.washingtonpost.com/crossword-puzzles/sunday-evan-birnholz/"}
                darkColor={"dark:bg-[#31302c]"}
                darkImgInvert={true}
                imgRef={"/crossword-grid.svg"}
                gameName={"Sunday Crossword"}
                smallText={true}
                frequency={"Weekly"}
                inverseTag={true}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#e3cebd]"}
                href={"https://bandle.app/"}
                darkColor={"dark:bg-[#3a2f24]"}
                imgRef={"https://pbs.twimg.com/profile_images/1660704099191386112/tG2V4gWs_400x400.jpg"}
                gameName={"Bandle"}
                frequency={"Daily"}
                inverseTag={true}
            ></GameWidget>
            <GameWidget
                color={"bg-black"}
                href={"https://cinequote.net/"}
                darkColor={"dark:bg-[#242220]"}
                imgRef={"/cinequote-reel.svg"}
                gameName={"Cinequote"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#d6e8ff]"}
                href={"https://www.minutecryptic.com/"}
                darkColor={"dark:bg-[#2b3a52]"}
                imgRef={"https://www.minutecryptic.com/icon.ico?73f70e8b5bf80676"}
                gameName={"Minute Cryptic"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
            ></GameWidget>

            <GameWidget
                color={"bg-[#31302e]"}
                href={"https://travle.earth"}
                darkColor={"dark:bg-[#34332f]"}
                imgRef={"https://travle.earth/icons/apple-touch-icon-180x180.png"}
                gameName={"Travle"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#bc1d1d]"}
                href={"https://framed.wtf/"}
                darkColor={"dark:bg-[#7c1717]"}
                imgRef={"https://framed.wtf/icons/apple-touch-icon.png"}
                gameName={"Framed"}
                frequency={"Daily"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#1b1b1b]"}
                href={"https://episode.wtf/"}
                darkColor={"dark:bg-[#232322]"}
                imgRef={"https://episode.wtf/icons/apple-touch-icon.png"}
                gameName={"Episode"}
                frequency={"Weekly"}
                nameColor={"text-white"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#EAE8DD]"}
                href={"https://timeguessr.com/roundonedaily"}
                darkColor={"dark:bg-[#2c2a24]"}
                imgRef={"/time-guessr-text-logo.svg"}
                gameName={"TimeGuessr"}
                frequency={"Daily"}
                nameColor={"text-black"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#f4ecdd]"}
                href={"https://www.theatlantic.com/games/bracket-city"}
                darkColor={"dark:bg-[#32291d]"}
                darkImgInvert={true}
                imgRef={"https://cdn.theatlantic.com/media/games/bracket_city_emblem_v2.png"}
                gameName={"Bracket City"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
                logo={"https://cdn.theatlantic.com/_next/static/images/apple-touch-icon-152x152-aafde20dd981a38fcd549b29b2b3b785.png"}
            ></GameWidget>
<!--
            <GameWidget
                color={"bg-[#f2f2f2]"}
                href={"https://gisnep.com/"}
                darkColor={"dark:bg-[#26241f]"}
                darkImgInvert={true}
                imgRef={"https://gisnep.com/safari-pinned-tab.svg"}
                gameName={"Gisnep"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
            ></GameWidget>
            <GameWidget
                color={"bg-[#ff7070]"}
                href={"https://www.techyonic.co/swiftle"}
                darkColor={"dark:bg-[#6e2020]"}
                imgRef={"https://www.techyonic.co/favicon.ico"}
                gameName={"Swiftle"}
                frequency={"Daily"}
                nameColor={"text-black"}
                inverseTag={true}
            ></GameWidget>

            <GameWidget
                color={"bg-[#eef510]"}
                href={"https://popidle.the-sound.co.uk/guess-the-album"}
                darkColor={"dark:bg-[#4a4c08]"}
                imgRef={"/popidle_logo.png"}
                gameName={"Popidle"}
                frequency={"Daily"}
                inverseTag={true}
            ></GameWidget> -->
        </div>
    </div>
</body>
