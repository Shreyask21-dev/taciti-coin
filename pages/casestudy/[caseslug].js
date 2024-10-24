import Head from "next/head";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { BASEPATH } from "@/config";

export default function AllPages({ AllsinglePageList }) {
  console.log("AllsinglePageList", AllsinglePageList);

  if (AllsinglePageList.data.casestudy !== null) {
    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://taciti.coinage.host//wp-content/plugins/elementor/assets/lib/eicons/css/elementor-icons.min.css?ver=5.27.0"
            media="all"
          />
          

          <link
            rel="stylesheet"
            href={`https://taciti.coinage.host//wp-content/uploads/elementor/css/post-${AllsinglePageList?.data?.casestudy?.casestudyId}.css`}
            media="all"
          />
        </Head>
        <div className="inner-page">
          {AllsinglePageList?.data?.casestudy?.content !== null && (
            <div
              dangerouslySetInnerHTML={{
                __html: `${AllsinglePageList?.data?.casestudy?.content}`,
              }}
            ></div>
          )}
        </div>
      </>
    );
  }
}

export async function getStaticPaths() {
  const resourceAPI = await fetch(`${BASEPATH}graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      query NewQuery {
        casestudies {
          nodes {
            slug
            title
            casestudyId
          }
        }
      }
             `,
    }),
  });
  const resourceAPIList = await resourceAPI.json();
  const paths = resourceAPIList.data.casestudies.nodes.map((list) => ({
    params: { caseslug: list.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}



export async function getStaticProps({ params }) {
  console.log("params-URL->" , params)
  const currentApi = await fetch(`${BASEPATH}graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query NewQuery {
            casestudy(id: "/casestudy/${params.caseslug}" ,idType: URI) {
          casestudyId
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
