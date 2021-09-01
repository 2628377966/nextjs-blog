import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../component/layout'
import utilStyles from '../styles/utils.module.css'
import Date from "../component/date";


import { getSortedPostsData } from '../lib/posts'


export async function getStaticProps() {
  const allPosts = getSortedPostsData()
  return {
    props: { allPosts }
  }
}


export default function Home({ allPosts }) {
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}> Blog list</h2>
        <ul className={utilStyles.list}>
          {
            allPosts.map(({ id, date, title }) => {
              return <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>

                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date}></Date>
                </small>
              </li>
            })
          }

        </ul>
      </section>
    </Layout >
  )
}

