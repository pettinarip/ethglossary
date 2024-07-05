'use client'
import { useState } from 'react'
import CommentsList from './CommentsList'
import AddTranslation from './AddTranslation'
import AddComment from './AddComment'
import VoteButtons from './VoteButtons'
import { useAuth } from '../app/context/AuthContext'

export default function TranslationsList({ initialTranslations, termId }) {
  const [translations, setTranslations] = useState(initialTranslations)
  const { user } = useAuth()

  const handleNewTranslation = (newTranslation) => {
    setTranslations((prevTranslations) => [...prevTranslations, newTranslation])
  }

  const handleNewComment = (translationId, newComment) => {
    setTranslations((prevTranslations) =>
      prevTranslations.map((translation) =>
        translation.id === translationId
          ? { ...translation, comments: [...(translation.comments || []), newComment] }
          : translation
      )
    )
  }

  return (
    <div>
      <AddTranslation termId={termId} onTranslationAdded={handleNewTranslation} />
      <hr className="mt-4 mb-4" />
      {translations.map((translation) => (
        <div key={translation.id} className="mb-2 flex items-center justify-between p-2 border rounded">
          <span>{translation.translation}</span>
          <VoteButtons translationId={translation.id} initialVotes={translation.votes} userId={user?.id} />
          {/* <CommentsList translationId={translation.id} /> */}
          {/* <AddComment translationId={translation.id} onCommentAdded={(newComment) => handleNewComment(translation.id, newComment)} /> */}
        </div>
      ))}
    </div>
  )
}
