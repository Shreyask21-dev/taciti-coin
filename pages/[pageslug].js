import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BASEPATH } from "@/config";
import { useRouter } from "next/router"; // Import useRouter

export default function AllPages({ AllsinglePageList }) {
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter


  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href={`https://taciti-wp-backend-prd-h3c8hrcfh6hme2fb.southindia-01.azurewebsites.net/wp-content/uploads/elementor/css/post-${AllsinglePageList.data.page.pageId}.css`}
          media="all"
        />
      </Head>
      <div className="inner-page">
        {AllsinglePageList.data.page.content && (
          <div
            dangerouslySetInnerHTML={{
              __html: `${AllsinglePageList.data.page.content}`,
            }}
          ></div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const resourceAPI = await fetch(`${BASEPATH}graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
             query NewQuery {
              pages(first: 5) {
                nodes {
                  pageId
                  slug
                  title
                }
              }
            }
             `,
    }),
  });
  const resourceAPIList = await resourceAPI.json();
  const paths = resourceAPIList.data.pages.nodes.map((list) => ({
    params: { pageslug: list.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const currentApi = await fetch(`${BASEPATH}graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query NewQuery {
              page(id: "${params.pageslug}" ,idType: URI) {
                pageId
                slug
                title
                content
              }
            }
          `,
    }),
  });

  const AllsinglePageList = await currentApi.json();

  return {
    props: {
      AllsinglePageList,
    },
    revalidate: 10,
  };
}
