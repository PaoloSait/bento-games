<script lang="ts">
    import { onMount, tick } from "svelte";

    // ---------------------------------------------------------------------
    // Notes (MIDI numbers: 21 = A0, 60 = C4 / middle C, 108 = C8)
    // ---------------------------------------------------------------------
    const NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    const pc = (midi: number) => midi % 12;
    const octave = (midi: number) => Math.floor(midi / 12) - 1;
    const fullName = (midi: number) => NAMES[pc(midi)] + octave(midi);

    // The answer must be findable on a 12-fret guitar: E2 (40) .. E5 (76).
    const LOW = 40;
    const HIGH = 76;

    // ---------------------------------------------------------------------
    // Daily puzzle
    // ---------------------------------------------------------------------
    const LAUNCH = new Date(2026, 10, 21); // puzzle #1

    function todayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
    function puzzleNumber() {
        const d = new Date();
        const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        return Math.round((today.getTime() - LAUNCH.getTime()) / 86400000) + 1;
    }
    function hash(s: string) {
        let h = 2166136261;
        for (const ch of s) {
            h ^= ch.charCodeAt(0);
            h = Math.imul(h, 16777619);
        }
        return h >>> 0;
    }
    const noteForSeed = (seed: string) => LOW + (hash("pitch:" + seed) % (HIGH - LOW + 1));

    // ---------------------------------------------------------------------
    // Audio (Web Audio synth, no samples)
    // ---------------------------------------------------------------------
    let ctx: AudioContext | null = null;
    function audio() {
        if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (ctx.state === "suspended") ctx.resume();
        return ctx;
    }
    const freq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

    function play(midi: number, dur = 1.8) {
        const a = audio();
        const t0 = a.currentTime + 0.02;
        const f = freq(midi);
        const env = a.createGain();
        env.gain.setValueAtTime(0.0001, t0);
        env.gain.exponentialRampToValueAtTime(0.3, t0 + 0.008);
        env.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        const lp = a.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(Math.min(f * 8, 12000), t0);
        lp.frequency.exponentialRampToValueAtTime(f * 1.5, t0 + dur);
        lp.connect(env).connect(a.destination);
        const partials: [OscillatorType, number, number][] = [
            ["triangle", 1, 1],
            ["sine", 2, 0.35],
            ["sine", 3, 0.12],
        ];
        for (const [type, mult, amp] of partials) {
            const o = a.createOscillator();
            o.type = type;
            o.frequency.value = f * mult;
            const g = a.createGain();
            g.gain.value = amp;
            o.connect(g).connect(lp);
            o.start(t0);
            o.stop(t0 + dur + 0.05);
        }
    }
    const playNote = () => play(note);

    // ---------------------------------------------------------------------
    // Game state
    // ---------------------------------------------------------------------
    type Stage = "intro" | "piano" | "name" | "guitar" | "done";
    type Result = { piano: number; name: number; guitar: number };

    let mode: "daily" | "practice" = "daily";
    let note: number = noteForSeed(todayKey());
    let stage: Stage = "intro";
    let pianoRight: number | null = null;
    let pianoWrong: number[] = [];
    let nameWrong: number[] = [];
    let nameRight = false;
    let fretWrong: string[] = [];
    let fretRight: string | null = null;
    let result: Result | null = null;
    let copied = false;

    $: misses = pianoWrong.length + nameWrong.length + fretWrong.length;

    const storageKey = () => `pitch-note:${todayKey()}`;

    onMount(() => {
        try {
            const saved = localStorage.getItem(storageKey());
            if (saved) {
                result = JSON.parse(saved);
                stage = "done";
            }
        } catch {}
    });

    function reset(n: number) {
        note = n;
        pianoRight = null;
        pianoWrong = [];
        nameWrong = [];
        nameRight = false;
        fretWrong = [];
        fretRight = null;
        result = null;
        copied = false;
    }

    async function start() {
        stage = "piano";
        playNote();
        await tick();
        centerPiano();
    }

    function practice() {
        mode = "practice";
        let next: number;
        do next = LOW + Math.floor(Math.random() * (HIGH - LOW + 1));
        while (next === note);
        reset(next);
        start();
    }

    // ---------------------------------------------------------------------
    // Stage 1: find the exact key on a full 88-key piano
    // ---------------------------------------------------------------------
    const WHITE_W = 32; // px
    const BLACK_W = 20;
    const isBlack = (m: number) => [1, 3, 6, 8, 10].includes(pc(m));
    const KEYS = Array.from({ length: 88 }, (_, i) => 21 + i);
    const WHITE_KEYS = KEYS.filter((m) => !isBlack(m));
    // A black key sits on the boundary after the white key just below it.
    const BLACK_KEYS = KEYS.filter(isBlack).map((m) => ({
        midi: m,
        left: (WHITE_KEYS.indexOf(m - 1) + 1) * WHITE_W - BLACK_W / 2,
    }));

    let pianoScroller: HTMLDivElement;
    function centerPiano() {
        if (!pianoScroller) return;
        const middleC = WHITE_KEYS.indexOf(60) * WHITE_W + WHITE_W / 2;
        pianoScroller.scrollLeft = middleC - pianoScroller.clientWidth / 2;
    }

    function pressKey(m: number) {
        if (stage !== "piano" || pianoRight !== null || pianoWrong.includes(m)) return;
        play(m, 1.2);
        if (m === note) {
            pianoRight = m;
            stage = "name";
        } else {
            pianoWrong = [...pianoWrong, m];
        }
    }

    function keyState(m: number, right: number | null, wrong: number[]) {
        if (right === m) return "right";
        if (wrong.includes(m)) return "wrong";
        return "idle";
    }

    // ---------------------------------------------------------------------
    // Stage 2: name the note
    // ---------------------------------------------------------------------
    function guessName(p: number) {
        if (stage !== "name" || nameRight || nameWrong.includes(p)) return;
        if (p === pc(note)) {
            // Label the key on the piano for a moment so the name sticks.
            nameRight = true;
            setTimeout(() => (stage = "guitar"), 1200);
        } else {
            nameWrong = [...nameWrong, p];
        }
    }

    // ---------------------------------------------------------------------
    // Stage 3: find the same pitch on a 12-fret guitar
    // ---------------------------------------------------------------------
    // High e on top (tab orientation). MIDI of each open string.
    const STRINGS = [
        { name: "e", midi: 64 },
        { name: "B", midi: 59 },
        { name: "G", midi: 55 },
        { name: "D", midi: 50 },
        { name: "A", midi: 45 },
        { name: "E", midi: 40 },
    ];
    const FRETS = Array.from({ length: 13 }, (_, i) => i); // open + frets 1..12
    const MARKERS = [3, 5, 7, 9];

    function pressFret(s: number, f: number) {
        const id = `${s}-${f}`;
        if (stage !== "guitar" || fretRight !== null || fretWrong.includes(id)) return;
        const midi = STRINGS[s].midi + f;
        play(midi, 1.4);
        if (midi === note) {
            fretRight = id;
            finish();
        } else {
            fretWrong = [...fretWrong, id];
        }
    }

    function finish() {
        result = { piano: pianoWrong.length, name: nameWrong.length, guitar: fretWrong.length };
        if (mode === "daily") {
            try {
                localStorage.setItem(storageKey(), JSON.stringify(result));
            } catch {}
        }
        setTimeout(() => (stage = "done"), 900);
    }

    // ---------------------------------------------------------------------
    // Share
    // ---------------------------------------------------------------------
    // Absolute URLs: share previews (WhatsApp, iMessage...) need them.
    const SITE = "https://bento-games.vercel.app";
    const PAGE_URL = `${SITE}/pitch`;
    const SHARE_DESC = "Hear a note. Find it on the piano, name it, then find it on the guitar. Fewest misses wins.";

    const row = (n: number) => "🟥".repeat(n) + "🟩";
    $: total = result ? result.piano + result.name + result.guitar : 0;
    $: shareText = result
        ? `Pitch${mode === "daily" ? ` #${puzzleNumber()}` : " (practice)"}\n🎹 ${row(result.piano)}\n🔤 ${row(result.name)}\n🎸 ${row(result.guitar)}\n${total === 0 ? "Perfect ear!" : `${total} miss${total === 1 ? "" : "es"}`}\n${PAGE_URL}`
        : "";

    async function share() {
        try {
            await navigator.clipboard.writeText(shareText);
            copied = true;
            setTimeout(() => (copied = false), 1500);
        } catch {}
    }

    const STEPS = ["Piano", "Name", "Guitar"];
    const ORDER: Stage[] = ["intro", "piano", "name", "guitar", "done"];
    $: stageIdx = ORDER.indexOf(stage);
</script>

<svelte:head>
    <title>Pitch · Bento Games</title>
    <meta name="description" content={SHARE_DESC} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Bento Games" />
    <meta property="og:title" content="Pitch — a daily ear-training game" />
    <meta property="og:description" content={SHARE_DESC} />
    <meta property="og:url" content={PAGE_URL} />
    <meta property="og:image" content={`${SITE}/pitch-og.png`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Pitch: hear a note, find it on the piano, name it, then find it on the guitar." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Pitch — a daily ear-training game" />
    <meta name="twitter:description" content={SHARE_DESC} />
    <meta name="twitter:image" content={`${SITE}/pitch-og.png`} />
</svelte:head>

<div class="min-h-screen flex flex-col items-center text-[#1d1b18] dark:text-[#f0ebe6]">
    <!-- Same width as the home grid, and fixed regardless of what each stage renders. -->
    <div class="max-w-screen-lg md:w-[66vw] w-[84vw] py-8 flex flex-col gap-6">
        <div class="flex items-center justify-between">
            <a href="/" class="text-sm opacity-70 hover:opacity-100">← Games</a>
            <span class="text-xs px-3 py-1 rounded-full bg-black/10 dark:bg-white/15"
                >{mode === "practice" ? "Practice" : `#${puzzleNumber()}`}</span
            >
        </div>

        <div class="flex items-end justify-between gap-4">
            <h1 class="font-header md:text-5xl text-4xl">Pitch</h1>
            {#if stage !== "intro" && stage !== "done"}
                <div class="text-sm opacity-70 pb-1">{misses} miss{misses === 1 ? "" : "es"}</div>
            {/if}
        </div>

        {#if stage !== "intro" && stage !== "done"}
            <div class="flex gap-2">
                {#each STEPS as s, i}
                    <div class="flex-1 flex flex-col gap-1">
                        <div
                            class="h-1.5 rounded-full {stageIdx > i + 1
                                ? 'bg-emerald-500'
                                : stageIdx === i + 1
                                  ? 'bg-[#1d1b18] dark:bg-[#f0ebe6]'
                                  : 'bg-black/10 dark:bg-white/10'}"
                        ></div>
                        <div class="text-xs {stageIdx === i + 1 ? 'opacity-90' : 'opacity-40'}">{s}</div>
                    </div>
                {/each}
            </div>

            <button
                class="w-full rounded-full py-3 font-semibold bg-[#1d1b18] text-white dark:bg-[#f0ebe6] dark:text-[#1d1b18] active:scale-[0.99] transition"
                on:click={playNote}>▶ Play the note</button
            >
        {/if}

        <!-- Intro -->
        {#if stage === "intro"}
            <div class="rounded-[2rem] bg-white dark:bg-[#26241f] dark:ring-1 dark:ring-white/10 p-6 flex flex-col gap-4">
                <p class="text-lg">A note plays. Track it down in three steps:</p>
                <ol class="flex flex-col gap-2 text-base">
                    <li>🎹 <b>Piano</b> — find the exact key.</li>
                    <li>🔤 <b>Name</b> — say which note it is, e.g. <i>G</i>.</li>
                    <li>🎸 <b>Guitar</b> — find a fret that plays that same pitch.</li>
                </ol>
                <p class="opacity-70 text-sm">
                    Wrong taps go red. Fewest misses wins. Replay the note as often as you like.
                </p>
                <button
                    class="rounded-full py-3 font-semibold bg-[#1d1b18] text-white dark:bg-[#f0ebe6] dark:text-[#1d1b18]"
                    on:click={start}>Play today's note</button
                >
            </div>
        {/if}

        <!-- Stage 1: Piano -->
        {#if stage === "piano" || stage === "name"}
            <div class="flex flex-col gap-3">
                <div class="font-semibold">
                    {#if stage === "piano"}Find the key{:else}Found it — now name the note{/if}
                </div>
                <div bind:this={pianoScroller} class="overflow-x-auto rounded-xl pb-2">
                    <div class="relative h-44 select-none" style="width: {WHITE_KEYS.length * WHITE_W}px">
                        {#each WHITE_KEYS as m, i}
                            {@const st = keyState(m, pianoRight, pianoWrong)}
                            <button
                                class="absolute top-0 h-full rounded-b-md border border-black/20 flex items-end justify-center pb-2 text-[10px] font-semibold transition
                                {st === 'right'
                                    ? 'bg-emerald-500 text-white'
                                    : st === 'wrong'
                                      ? 'bg-red-500 text-white'
                                      : 'bg-white dark:bg-[#ebe6df] text-black/40 active:bg-gray-200'}"
                                style="left: {i * WHITE_W}px; width: {WHITE_W}px"
                                on:click={() => pressKey(m)}
                                aria-label="piano key"
                            >
                                {st === "right" && nameRight ? fullName(m) : pc(m) === 0 ? `C${octave(m)}` : ""}
                            </button>
                        {/each}
                        {#each BLACK_KEYS as k}
                            {@const st = keyState(k.midi, pianoRight, pianoWrong)}
                            <button
                                class="absolute top-0 h-[60%] rounded-b-md z-10 transition
                                {st === 'right'
                                    ? 'bg-emerald-600'
                                    : st === 'wrong'
                                      ? 'bg-red-600'
                                      : 'bg-[#1d1b18] active:bg-[#3a3631]'}"
                                style="left: {k.left}px; width: {BLACK_W}px"
                                on:click={() => pressKey(k.midi)}
                                aria-label="piano key"
                            >
                                {#if st === "right" && nameRight}
                                    <span class="absolute bottom-1 inset-x-0 text-center text-[9px] font-bold text-white"
                                        >{fullName(k.midi)}</span
                                    >
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>
                {#if stage === "piano"}
                    <div class="text-xs opacity-60">Full 88-key piano — scroll sideways. Keys play when tapped.</div>
                {/if}
            </div>
        {/if}

        <!-- Stage 2: Name (appears right under the piano) -->
        {#if stage === "name"}
            <div class="flex flex-col gap-3">
                <div class="grid grid-cols-6 gap-2">
                    {#each NAMES as n, p}
                        <button
                            class="rounded-xl py-4 font-semibold transition
                            {nameRight && p === pc(note)
                                ? 'bg-emerald-500 text-white'
                                : nameWrong.includes(p)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-white dark:bg-[#26241f] dark:ring-1 dark:ring-white/10 active:scale-95'}"
                            on:click={() => guessName(p)}>{n}</button
                        >
                    {/each}
                </div>
            </div>
        {/if}

        <!-- Stage 3: Guitar -->
        {#if stage === "guitar"}
            <div class="flex flex-col gap-3">
                <div class="font-semibold">
                    Find this <span class="font-header text-xl">{NAMES[pc(note)]}</span> on the fretboard
                    <span class="opacity-60 font-normal">— same pitch, not just the same name</span>
                </div>
                <div class="overflow-x-auto pb-2">
                    <div class="min-w-[520px] select-none">
                        <div class="rounded-xl bg-[#6b4a2e] dark:bg-[#4a3420] py-2 shadow-inner">
                            {#each STRINGS as str, s}
                                <div class="flex h-9">
                                    {#each FRETS as f}
                                        {@const id = `${s}-${f}`}
                                        <button
                                            class="relative flex items-center justify-center {f === 0
                                                ? 'w-10 border-r-[6px] border-[#e9e1d3]'
                                                : 'flex-1 border-r-2 border-[#c9c2b5]/70'}"
                                            on:click={() => pressFret(s, f)}
                                            aria-label="{str.name} string fret {f}"
                                        >
                                            <span
                                                class="absolute inset-x-0 top-1/2 bg-[#e9e1d3]"
                                                style="height: {1 + s * 0.5}px"
                                            ></span>
                                            {#if fretRight === id || fretWrong.includes(id)}
                                                <span
                                                    class="relative z-10 w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center
                                                    {fretRight === id ? 'bg-emerald-500' : 'bg-red-500'}"
                                                    >{fullName(str.midi + f)}</span
                                                >
                                            {:else}
                                                <span
                                                    class="relative z-10 w-6 h-6 rounded-full hover:bg-white/30 active:bg-white/50"
                                                ></span>
                                            {/if}
                                        </button>
                                    {/each}
                                </div>
                            {/each}
                        </div>
                        <div class="flex mt-1 text-xs opacity-60">
                            {#each FRETS as f}
                                <div class="{f === 0 ? 'w-10' : 'flex-1'} text-center">
                                    {#if f === 12}●●{:else if MARKERS.includes(f)}●{:else}{f}{/if}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="text-xs opacity-60">12 frets, standard tuning, high e on top.</div>
            </div>
        {/if}

        <!-- Done -->
        {#if stage === "done" && result}
            <div class="rounded-[2rem] bg-white dark:bg-[#26241f] dark:ring-1 dark:ring-white/10 p-6 flex flex-col gap-5">
                <div class="flex items-baseline justify-between">
                    <div>
                        <div class="text-sm opacity-60">{mode === "daily" ? "Today's note" : "The note"}</div>
                        <div class="font-header text-5xl">{fullName(note)}</div>
                    </div>
                    <button
                        class="rounded-full px-4 py-2 text-sm font-semibold bg-black/10 dark:bg-white/15"
                        on:click={playNote}>▶ Hear it</button
                    >
                </div>
                <div class="flex flex-col gap-2 text-lg">
                    <div>🎹 {row(result.piano)}</div>
                    <div>🔤 {row(result.name)}</div>
                    <div>🎸 {row(result.guitar)}</div>
                </div>
                <div class="text-xl font-semibold">
                    {total === 0 ? "Perfect ear!" : `${total} miss${total === 1 ? "" : "es"}`}
                </div>
                <div class="flex gap-2">
                    <button
                        class="flex-1 rounded-full py-3 font-semibold bg-[#1d1b18] text-white dark:bg-[#f0ebe6] dark:text-[#1d1b18]"
                        on:click={share}>{copied ? "Copied!" : "Share"}</button
                    >
                    <button
                        class="flex-1 rounded-full py-3 font-semibold bg-black/10 dark:bg-white/15"
                        on:click={practice}>Practice another</button
                    >
                </div>
            </div>
        {/if}
    </div>
</div>
