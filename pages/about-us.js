import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { BASEPATH } from "@/config";
import Head from "next/head";

export default function AboutUs({ userData ,pageData }) {
  console.log("pageData", pageData);

  const [isOpen, setIsOpen] = useState(false);
  const [userTeamData, setuserTeamData] = useState({});

  const openPopup = (databaseId) => {
    setIsOpen(true);
    const getData =
      userData && userData.find((item) => item.databaseId == databaseId);
    getData && setuserTeamData(getData);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
    <Head>
    <link
            rel="stylesheet"
            href={`http://taciti-wp-backend-prd-h3c8hrcfh6hme2fb.southindia-01.azurewebsites.net/wp-content/uploads/elementor/css/post-${pageData?.pageId}.css`}
            media="all"
          />
    </Head>
    <div className="inner-page">
          {pageData?.content !== null && (
            <div
              dangerouslySetInnerHTML={{
                __html: `${pageData?.content}`,
              }}
            ></div>
          )}
        </div>



    
      <div className="about-second">
        
        
           <div className="container">
          <div className="row  about-team-class">
            <div className="space5"></div>
            {userData?.map((item, index) => (
              <div
                className="col-lg-3 cusor"
                key={item?.id}
                onClick={() => openPopup(item?.databaseId)}
              >
                <div className="card-body-list">
                  <div
                    className="about-team"
                    style={{
                      backgroundImage: `url(${item?.featuredImage?.node?.guid})`,
                    }}
                  >
                    <div className="inline-name openButton">
                      <h6 className="text-center">{item?.title}</h6>
                      <div
                        className="description"
                        dangerouslySetInnerHTML={{ __html: item?.excerpt }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Modal className="" show={isOpen} onHide={closePopup}>
              <div className="modal-background"></div>
              <div className="popupContainer">
                <div className="popup modal-body">
                  <div className="closeButton" onClick={closePopup}>
                    Close
                  </div>
                  <div className="teamCard   ">
                    <div className="head">
                      <h2 className="text-center">{userTeamData.title}</h2>
                      <div
                        className="inner-design"
                        dangerouslySetInnerHTML={{
                          __html: userTeamData.excerpt,
                        }}
                      ></div>

                      <div
                        className="content-design"
                        style={{color:"#4e5764", fontSize:"18px", fontFamily:"Roboto-light"}}
                        dangerouslySetInnerHTML={{
                          __html: userTeamData.content,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}




export async function getServerSideProps() {
  try {
    const [teamsResponse, pageResponse] = await Promise.all([
      fetch(`${BASEPATH}graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              teams {
                nodes {
                  title
                  content
                  excerpt
                  databaseId
                  featuredImage {
                    node {
                      guid
                    }
                  }
                }
              }
            }
          `,
        }),
      }),
      fetch(`${BASEPATH}graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              page(id: "about", idType: URI) {
                content
                pageId
                title
              }
            }
          `,
        }),
      }),
    ]);

    const [teamsData, pageData] = await Promise.all([
      teamsResponse.json(),
      pageResponse.json(),
    ]);

    return {
      props: {
        userData: teamsData.data.teams.nodes,
        pageData: pageData.data.page,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        teamsData: null,
        pageData: null,
        error: "Error fetching data",
      },
    };
  }
}
