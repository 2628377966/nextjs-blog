import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


const posts_dir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(posts_dir)
    const postsData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, '')

        const filePath = path.join(posts_dir, filename)
        const fileContent = fs.readFileSync(filePath)

        const matterResult = matter(fileContent)

        return {
            id,
            ...matterResult.data
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

export function getPostIds() {
    const fileNames = fs.readdirSync(posts_dir)
    return fileNames.map(filename => {
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const filePath = path.join(posts_dir, `${id}.md`)
    const fileContent = fs.readFileSync(filePath)

    const matterResult = matter(fileContent)

    const processedContent = await remark().use(html).process(matterResult.content)
    const htmlContent = processedContent.toString()

    return {
        id,
        htmlContent,
        ...matterResult.data
    }
}