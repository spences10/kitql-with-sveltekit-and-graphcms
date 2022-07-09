import type { RequestHandlerArgs } from '$houdini'
import { HoudiniClient } from '$houdini'

async function fetchQuery({
  fetch,
  text = '',
  variables = {},
  session,
  metadata,
}: RequestHandlerArgs) {
  const url =
    import.meta.env.VITE_GRAPHQL_API ||
    'https://api-eu-central-1.graphcms.com/v2/ckws4u9sz3y5701yy3u5p4by3/master'

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  return await result.json()
}

export const houdiniClient = new HoudiniClient(fetchQuery)
