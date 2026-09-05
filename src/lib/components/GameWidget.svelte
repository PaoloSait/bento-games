<script lang="ts">
    export let href: string | undefined = undefined;
    export let color: string;
    export let imgRef: string;
    export let gameName: string;
    export let frequency: string;
    export let logo: string = "";
    export let nameColor: string = "text-black";
    export let inverseTag: boolean = false;
    export let smallText: boolean = false;

    // Dark mode. `darkColor` / `darkNameColor` take fully-written Tailwind
    // classes (i.e. including the `dark:` prefix) so Tailwind can see them in
    // the source. `darkImgInvert` flips monochrome (black-on-transparent)
    // icons so they stay visible on a dark tile.
    export let darkColor: string = "";
    export let darkNameColor: string = "dark:text-white";
    export let darkImgInvert: boolean = false;
</script>

<a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class={`${color} ${darkColor} relative hover:brightness-75 dark:hover:brightness-125 dark:ring-1 dark:ring-inset dark:ring-white/10 bg-background-grey text-background-black rounded-[2rem] md:h-[20vw] h-[40vw] md:w-[20vw] w-[40vw] overflow-hidden m-[1vw] md:mb-0 mb-3 p-2 flex flex-col items-center justify-center gap-2`}
>
    <img
        src={imgRef}
        alt=""
        class={`md:w-20 md:h-20 w-8 h-8 object-contain rounded-md ${darkImgInvert ? "dark:invert" : ""}`}
    />

    <div
        class={`md:text-lg text-base font-semibold text-ellipsis line-clamp-1 ${smallText ? "text-sm" : "text-base"} ${nameColor} ${darkNameColor}`}
    >
        {gameName}
    </div>

    {#if inverseTag}
        <div
            class="py-1 md:px-4 px-2 bg-black dark:bg-white/15 rounded-full md:text-sm text-xs text-white"
        >
            {frequency}
        </div>
    {:else}
        <div
            class="py-1 md:px-4 px-2 bg-white dark:bg-white/15 rounded-full md:text-sm text-xs dark:text-white"
        >
            {frequency}
        </div>
    {/if}

    {#if logo != ""}
        <div
            class="absolute top-0 left-0 bg-white dark:bg-[#e8e3db] pl-4 pt-4 pr-6 pb-6 rounded-br-full"
        >
            <img
                class="md:w-6 md:h-6 h-4 w-4 object-contain"
                src={logo}
                alt=""
            />
        </div>
    {/if}
</a>
