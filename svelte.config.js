import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// The site is a single prerendered page of external links -- no server
		// routes, no endpoints -- so it ships as plain static files. This also
		// keeps the build independent of Vercel's Node runtime churn, which
		// adapter-auto/adapter-vercel is sensitive to.
		adapter: adapter()
	}
};

export default config;
