export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig()

  return useFetch(request, { baseURL: config.public.API_BASE_URL, ...opts })
}
