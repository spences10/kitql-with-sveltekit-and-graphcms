<script context="module" lang="ts">
  import Footer from '$lib/components/footer.svelte'
  import Navbar from '$lib/components/navbar.svelte'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import '../app.css'

  import { browser } from '$app/env'
  import { houdiniClient } from '$graphql/client'
  import { GQL_AllPages } from '$houdini'

  houdiniClient.init()
</script>

<script lang="ts">
  $: browser && GQL_AllPages.fetch()
  onMount(() => {
    themeChange(false)
  })
  $: pages = $GQL_AllPages.data?.pages || [
    {
      title: null,
      slug: null,
      content: { html: null },
      id: null,
    },
  ]
</script>

<Navbar {pages} />

<main class="container max-w-3xl mx-auto px-4">
  <slot />
</main>

<Footer />
