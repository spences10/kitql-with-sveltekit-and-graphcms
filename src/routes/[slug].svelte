<script lang="ts" context="module">
  import { browser } from '$app/env'
  import { GQL_GetPage, type GetPage$input } from '$houdini'
  import type { LoadEvent } from '@sveltejs/kit'

  export const load = async (event: LoadEvent) => {
    const variables = { slug: event.params.slug }

    await GQL_GetPage.fetch({ event, variables })
    return {
      props: { variables },
    }
  }
</script>

<script lang="ts">
  export let variables: GetPage$input
  $: browser && GQL_GetPage.fetch({ variables })
  $: ({
    title,
    content: { html },
  } = $GQL_GetPage.data?.page || { title: null, content: { html } })
</script>

<svelte:head>
  <title>KitQL with GraphCMS | {title || ``}</title>
</svelte:head>

<h1 class="text-4xl font-semibold mb-5">{title}</h1>

<article class="prose">
  {@html html}
</article>
