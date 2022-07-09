<script lang="ts" context="module">
  import { GQL_GetPost, type GetPost$input } from '$houdini'
  import type { LoadEvent } from '@sveltejs/kit'

  export const load = async (event: LoadEvent) => {
    const variables = { slug: event.params.slug }

    await GQL_GetPost.fetch({ event, variables })
    return {
      props: { variables },
    }
  }
</script>

<script lang="ts">
  import { browser } from '$app/env'

  export let variables: GetPost$input
  $: browser && GQL_GetPost.fetch({ variables })
  $: ({
    title,
    date,
    tags,
    author: { name, authorTitle, picture },
    content: { html },
    coverImage,
  } = $GQL_GetPost.data?.post || {
    title: null,
    date: null,
    tags: [],
    author: { name, authorTitle, picture },
    content: { html },
    coverImage,
  })
</script>

<svelte:head>
  <title>KitQL with GraphCMS | {title || ``}</title>
</svelte:head>

<div class="sm:-mx-5 md:-mx-10 lg:-mx-20 xl:-mx-38 mb-5">
  <img
    src={coverImage.url}
    alt={`Cover image for ${title}`}
    class=""
  />
</div>

<h1 class="text-4xl font-semibold mb-5">{title}</h1>

<a href="/" class="inline-flex items-center mb-3">
  <img
    src={picture.url}
    alt={name}
    class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
  />
  <span class="flex-grow flex flex-col pl-4">
    <span class="title-font font-medium">{name}</span>
    <span class="text-secondary text-xs tracking-widest mt-0.5"
      >{authorTitle}</span
    >
  </span>
</a>

<p class="text-secondary text-xs tracking-widest font-semibold">
  {new Date(date).toDateString()}
</p>

<div class="mb-5 flex justify-between">
  <div>
    {#if tags}
      <div class="mt-5 space-x-2">
        {#each tags as tag}
          <span class="badge badge-primary">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<article class="prose mb-28">
  {@html html}
</article>
