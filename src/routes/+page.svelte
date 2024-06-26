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
                logo={"src/lib/components/NYTLogo.svg"}
            ></GameWidget>
            <GameWidget
                color={"bg-strands"}
                href={""}
                imgRef={"https://www.nytimes.com/games/prototype/dist/strands100px.ea3b90d2.svg"}
                gameName={"Strands"}
                frequency={"Daily"}
                logo={"src/lib/components/NYTLogo.svg"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={""}
                imgRef={"https://www.nytimes.com/games-assets/v2/assets/icons/mini.svg"}
                gameName={"The Mini"}
                frequency={"Daily"}
                logo={"src/lib/components/NYTLogo.svg"}
            ></GameWidget>
            <GameWidget
                color={"bg-white"}
                href={""}
                imgRef={"https://wapo.amuselabs.com/minimeta/images/thumbnail/crossword_thumb_black.svg"}
                gameName={"Mini Meta"}
                frequency={"Daily"}
                logo={"https://upload.wikimedia.org/wikipedia/commons/b/bf/Washington_Post_favicon.png"}
            ></GameWidget>
            <GameWidget
                color={"bg-[#e3cebd]"}
                href={""}
                imgRef={"https://pbs.twimg.com/profile_images/1660704099191386112/tG2V4gWs_400x400.jpg"}
                gameName={"Bandle"}
                frequency={"Daily"}
            ></GameWidget>
            <GameWidget
                color={"bg-black"}
                href={""}
                imgRef={"https://cinequote.net/circle.png"}
                gameName={"Cinequote"}
                frequency={"Daily"}
                nameColor={"text-white"}
                logo={""}
            ></GameWidget>
        </div>
    </div>
</body>
