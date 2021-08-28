import Layout from "../../component/layout";
import { getPostIds, getPostData } from '../../lib/posts'

export default function Post({data}) {
    return (
        <Layout>
            {data.title}
            <br/>
            {data.id}
            <br/>
            {data.date}
            <br/>
            <div dangerouslySetInnerHTML={{__html:data.htmlContent}}></div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const data =await getPostData(params.id)
    return {
        props: {
            data
        }
    }

}