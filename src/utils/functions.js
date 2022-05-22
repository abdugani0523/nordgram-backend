import { unlink, readdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const imagesPath = join(process.cwd(), 'images')
export async function deleteAvatar (name) {
    if(!name) return
    
    const imagePath = join(imagesPath, name)

    // Check exists
    if (!existsSync(imagePath)) return

    // Delete
    await unlink(imagePath)
}

export async function clearAvatar () {
    const images = await readdir(imagesPath)

    images.map(async image => {
        await unlink(join(imagesPath, image))
    })
}