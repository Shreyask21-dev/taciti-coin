import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BASEPATH } from "@/config";
import { useRouter } from "next/router"; // Import useRouter

export default function AllPages({ AllsinglePageList }) {
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Timer to ensure loader is shown for a minimum duration
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the timer
    }, 1000); // Minimum 2 seconds

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [router.asPath]); // Run once on mount

  // Show loader while loading
  if (loading) {
    return (
      <div className="loader">
        <style jsx>{`
          .loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.8);
            z-index: 9999;
          }

          .loader::after {
            content: "";
            border: 8px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 8px solid #3498db; /* Change color here */
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <h2>Loading...</h2>
      </div>
    );
  }

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
