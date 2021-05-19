import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// Usamos la función getPostData para coger la info del post con el respectivo id y hacerla información propia (props: {postData})

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

// Se hace uso de la función getAllPostIds para conseguir una lista de las paths conocidas, que son aquellas que están en lib/posts.js. 
// Se obtiene una lista de elementos con {params: {id: X}}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Cogemos los datos que hemos guardado en props que vienen de fuera para mostrarlos (title, id, date)

export default function Post({ postData }) {
    return (
        <Layout>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </Layout>
    )
  }