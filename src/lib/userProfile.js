import { supabase } from './supabaseClient'

export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    throw new Error(`Error fetching user profile: ${error.message}`)
  }

  return data
}

export async function updateUserDefaultLanguage(userId, languageCode) {
  const { error } = await supabase
    .from('profiles')
    .update({ default_language: languageCode })
    .eq('id', userId)

  if (error) {
    throw new Error(`Error updating default language: ${error.message}`)
  }
}
