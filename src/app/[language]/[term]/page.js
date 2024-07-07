import TranslationsSection from '@/components/translations/TranslationsSection'
import CommentsPanel from '@/components/comments/CommentsPanel'
import { fetchTerms } from '@/lib/fetchTerms'
import { fetchTranslations } from '@/lib/translations'
import { fetchComments } from '@/lib/comments'
import { fetchLanguages } from '@/lib/fetchLanguages'
import Sidebar from '@/components/navigation/Sidebar'

export async function generateMetadata({ params }) {
  return {
    title: `Translations for "${params.term}" in ${params.language}`,
  }
}

export default async function TermPage({ params }) {
  const { language, term } = params

  // Fetch term ID
  const terms = await fetchTerms()
  const termData = terms.find(t => t.term === term)
  if (!termData) {
    console.error('Term not found:', term)
    return {
      notFound: true,
    }
  }
  const termId = termData.id

  // Fetch language ID
  const languages = await fetchLanguages()
  const languageData = languages.find(l => l.code === language)
  if (!languageData) {
    console.error('Language not found:', language)
    return {
      notFound: true,
    }
  }
  const languageId = languageData.id

  // Fetch translations and comments
  const [translations, comments] = await Promise.all([
    fetchTranslations(termId, languageId),
    fetchComments(termId, languageId),
  ])

  // console.log('translations before render', translations)

  return (
    <div className="flex">
      <Sidebar className="p-4" terms={terms} languageCode={language} />
      <div className="flex-1 p-4">
        <div className="flex space-x-8">
          <div className="w-2/3 ">
            <h1 className="text-2xl font-bold mb-4">
              Translations for "{term}" in {language}
            </h1>
            <div className="mb-2 p-4 border rounded bg-gray-200">
              An ethereum transaction requires gas
            </div>
            <div className="mb-4 p-4 border rounded bg-gray-200">
              Gas is the fee required to successfully conduct a transaction or
              execute a contract on the Ethereum blockchain platform
            </div>
            <hr className="my-4" />
            <TranslationsSection
              initialTranslations={translations}
              termId={termId}
              languageId={languageId}
            />
          </div>
          <div className="w-1/3">
            <CommentsPanel
              initialComments={comments}
              termId={termId}
              languageId={languageId}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
