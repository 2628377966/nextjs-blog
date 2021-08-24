import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')
export function getSortedPostsData() {

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, '')
        const fullpath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(fullpath, 'utf8');
        const matterResult = matter(fileContent);
        return {
            id,
            ...matterResult
        };

    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        }
        return -1
    })

}