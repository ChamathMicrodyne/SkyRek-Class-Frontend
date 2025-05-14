import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export default function mediaUpload(file) {
    const mediaUploadPromise = new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected")
            return
        }

        const timeStamp = new Date().getTime()
        const newName = timeStamp + file.name

        supabase.storage.from("user-profile-images").upload(newName, file, {
              upsert:false,
              cacheControl:"3600"
            }).then(() => {
              const publicUrl = supabase.storage.from("user-profile-images").getPublicUrl(newName).data.publicUrl
              resolve(publicUrl)
            }).catch(() => {
              reject("Error occured in supabase connection")
            })
    })

    return mediaUploadPromise
}

