import Layout from "../../component/layout";
import { getPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from "../../component/date";
import utilsStyle from '../../styles/utils.module.css'

export default function Post({ data }) {
    return (
        <Layout>
            <Head>
                <title>{data.title}</title>
            </Head>
            <article>
                <h1 className={utilsStyle.headingXl}>{data.title}</h1>
                <div className={utilsStyle.lightText}><Date dateString={data.date} /></div>
                <div dangerouslySetInnerHTML={{ __html: data.htmlContent }} ></div>
            </article>
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
    const data = await getPostData(params.id)
    return {
        props: {
            data
        }
    }

}