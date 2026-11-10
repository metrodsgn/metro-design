import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // ISR deve buscar a versão atualizada da API após a revalidação do Next.js.
  useCdn: false,
})
