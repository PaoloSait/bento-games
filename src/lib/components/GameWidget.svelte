<script lang="ts">
    export let href: string | undefined = undefined;
    export let color: string;
    export let imgRef: string;
    export let gameName: string;
    export let frequency: string;
    export let logo: string = "";
    export let nameColor: string = "text-black";
    export let inverseTag: boolean = false;
</script>

<a
    {href}
    target="_blank"
    rel="noopener noreferrer"
    class={`${color} relative hover:brightness-75 bg-background-grey text-background-black rounded-[2rem] md:h-[20vw] h-[40vw] md:w-[20vw] w-[40vw] overflow-hidden m-[1vw] md:mb-0 mb-3 p-2 flex flex-col items-center justify-center gap-2`}
>
    <img src={imgRef} alt="" class="md:w-20 md:h-20 w-8 h-8 object-contain rounded-md" />

    <div class={`md:text-lg text-base font-semibold ${nameColor}`}>
        {gameName}
    </div>

    {#if inverseTag}
        <div class="py-1 px-4 bg-black rounded-full text-sm text-white">
            {frequency}
        </div>
    {:else}
        <div class="py-1 px-4 bg-white rounded-full text-sm">{frequency}</div>
    {/if}

    {#if logo != ""}
        <div
            class="absolute top-0 left-0 bg-white pl-4 pt-4 pr-6 pb-6 rounded-br-full"
        >
            <img class="md:w-6 md:h-6 h-4 w-4" src={logo} alt="" />
        </div>
    {/if}
</a>
