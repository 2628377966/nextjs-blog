import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../component/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts'

export default function Home(allPosts) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello , I am lucy</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData()
  return {
    props: { allPosts }
  }
}
