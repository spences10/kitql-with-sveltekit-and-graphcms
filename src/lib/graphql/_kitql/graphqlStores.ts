import { browser } from '$app/env';
import * as Types from '$lib/graphql/_kitql/graphqlTypes';
import { defaultStoreValue, RequestStatus, type RequestParameters, type RequestQueryParameters, type RequestResult } from '@kitql/client';
import { get, writable } from 'svelte/store';
import { kitQLClient } from '../kitQLClient';
 
function KQL_AllPostsStore() {
	// prettier-ignore
	const { subscribe, set, update } = writable<RequestResult<Types.AllPostsQuery, Types.AllPostsQueryVariables>>(defaultStoreValue);

	const cacheKey = 'KQL_AllPosts';

	return {
		subscribe,
		/**
		 * For SSR, you need to provide 'fetch' from the load function
		 * @returns the latest operation and fill this store
		 */
		query: async (
			params?: RequestQueryParameters<Types.AllPostsQueryVariables>
		): Promise<RequestResult<Types.AllPostsQuery, Types.AllPostsQueryVariables>> => {
			let { fetch, variables, settings } = params ?? {};
			let { cacheMs, policy } = settings ?? {};

			const storedVariables = get(KQL_AllPosts).variables;
			variables = variables ?? storedVariables;
			policy = policy ?? kitQLClient.policy;

			// Cache only in the browser for now. In SSR, we will need session identif to not mix peoples data
			if (browser) {
				if (policy !== 'network-only') {
					// prettier-ignore
					const cachedData = kitQLClient.requestCache<Types.AllPostsQuery, Types.AllPostsQueryVariables>({
						variables, cacheKey, cacheMs,	browser
					});
					if (cachedData) {
						const result = { ...cachedData, isFetching: false, status: RequestStatus.DONE };
						if (policy === 'cache-first') {
							set(result);
							if (!result.isOutdated) {
								return result;
							}
						} else if (policy === 'cache-only') {
							set(result);
							return result;
						} else if (policy === 'cache-and-network') {
							set(result);
						}
					}
				}
			}

			update((c) => {
				return { ...c, isFetching: true, status: RequestStatus.LOADING };
			});

			// prettier-ignore
			const res = await kitQLClient.request<Types.AllPostsQuery, Types.AllPostsQueryVariables>({
				skFetch: fetch,
				document: Types.AllPostsDocument,
				variables, 
				cacheKey, 
				browser
			});
			const result = { ...res, isFetching: false, status: RequestStatus.DONE, variables };
			set(result);
			return result;
		},
		/**
		 * Reset Cache
		 */
		resetCache(
			variables: Types.AllPostsQueryVariables | null = null,
			allOperationKey: boolean = true,
			withResetStore: boolean = true
		) {
			kitQLClient.cacheRemove(cacheKey, { variables, allOperationKey });
			if (withResetStore) {
				set(defaultStoreValue);
			}
		},
		/**
		 * Patch the store with a new object at the dedicated xPath location
		 */
		patch(newData: Object, xPath: string | null = null) {
			// prettier-ignore
			const updatedStore = kitQLClient.patch<Types.AllPostsQuery, Types.AllPostsQueryVariables>(cacheKey, get(KQL_AllPosts), newData, xPath);
			set(updatedStore);
			return updatedStore;
		}
	};
}
/**
 * KitQL Svelte Store with the latest `AllPosts` Operation
 */
export const KQL_AllPosts = KQL_AllPostsStore();
