<script>
  import ThemeSelect from './theme-select.svelte'

  export let pages
</script>

<div class="navbar mb-10 shadow-lg bg-neutral text-neutral-content">
  <div class="px-2 mx-2 navbar-start">
    <a sveltekit:prefetch href="/">
      <span class="text-lg font-bold"> KitQL with GraphCMS </span>
    </a>
  </div>
  <div class="px-2 mx-2 navbar-center">
    <div class="flex items-stretch">
      <a
        sveltekit:prefetch
        class="btn btn-ghost btn-sm rounded-btn"
        href={`/`}>Home</a
      >
      {#each pages as { title, slug }}
        <a
          sveltekit:prefetch
          class="btn btn-ghost btn-sm rounded-btn"
          href={`/${slug}`}>{title}</a
        >
      {/each}
    </div>
  </div>
  <div class="navbar-end">
    <ThemeSelect />
  </div>
</div>
