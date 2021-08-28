import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


const posts_dir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(posts_dir)
    const postsData = fileNames.map(filename => {
        const id = filename.replace('/\.md$/', '')

        const filePath = path.join(posts_dir, filename)
        const fileContent = fs.readFileSync(filePath)

        const matterResult = matter(fileContent)
        return {
            id,
            ...matterResult
        }
    })

    //sort ascending
    return postsData.sort(({ date: a }, { date: b }) => {
        if (a < b)
            return 1
        else if (a > b)
            return -1
        else
            return 0
    })

}