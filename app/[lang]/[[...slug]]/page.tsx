import type { Metadata } from 'next'
import {
  JsonLd,
  PageViewer,
  cleanPage,
  fetchPage,
  fetchPages,
  getBricks,
  getMetadata,
  types,
} from 'react-bricks/rsc'
import { ClickToEdit } from 'react-bricks/rsc/client'

import ErrorNoKeys from '@/components/errorNoKeys'
import ErrorNoPage from '@/components/errorNoPage'
import config from '@/react-bricks/config'

const getData = async (
  slug: any,
  locale: string
): Promise<{
  page: types.Page | null
  errorNoKeys: boolean
  errorPage: boolean
}> => {
  let errorNoKeys: boolean = false
  let errorPage: boolean = false

  if (!config.apiKey) {
    errorNoKeys = true

    return {
      page: null,
      errorNoKeys,
      errorPage,
    }
  }

  let cleanSlug = ''

  if (!slug) {
    cleanSlug = '/'
  } else if (typeof slug === 'string') {
    cleanSlug = slug
  } else {
    cleanSlug = slug.join('/')
  }

  const page = await fetchPage({
    slug: cleanSlug,
    language: locale,
    config,
  }).catch(() => {
    errorPage = true
    return null
  })

  return {
    page,
    errorNoKeys,
    errorPage,
  }
}

export async function generateStaticParams({
  params,
}: {
  params: { lang: string }
}) {
  if (!config.apiKey) {
    return []
  }

  const allPages = await fetchPages(config.apiKey, {
    language: params.lang,
    types: ['page', 'pokemon'],
  })

  const pages = allPages
    .map((page) =>
      page.translations.map((translation) => ({
        slug: translation.slug.split('/'),
      }))
    )
    .flat()

  return pages
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug?: string[] }
}): Promise<Metadata> {
  const { page } = await getData(params.slug?.join('/'), params.lang)
  if (!page?.meta) {
    return {}
  }

  return getMetadata(page)
}

export default async function Page({
  params,
}: {
  params: { lang: string; slug?: string[] }
}) {
  const { page, errorNoKeys, errorPage } = await getData(
    params.slug?.join('/'),
    params.lang
  )

  // Clean the received content
  // Removes unknown or not allowed bricks
  const bricks = getBricks()
  const pageOk = page ? cleanPage(page, config.pageTypes || [], bricks) : null

  return (
    <>
      {page?.meta && <JsonLd page={page}></JsonLd>}
      {pageOk && !errorPage && !errorNoKeys && <PageViewer page={pageOk} />}
      {errorNoKeys && <ErrorNoKeys />}
      {errorPage && <ErrorNoPage />}
      {pageOk && config && (
        <ClickToEdit
          pageId={pageOk?.id}
          language={params.lang}
          editorPath={config.editorPath || '/admin/editor'}
          clickToEditSide={config.clickToEditSide}
        />
      )}
    </>
  )
}
