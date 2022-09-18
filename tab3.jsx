import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    Thumbnail,
    Stack,
    Card,
    Button,
    Heading
} from "@shopify/polaris";

import React, { useEffect, useState, useCallback } from "react";
import { useInitFbSDK } from "./fb-hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export function Tab3() {

    const isFbSDKInitialized = useInitFbSDK();

    const [user, loading, error] = useAuthState(auth);

    const [shopUrl, setShopUrl] = React.useState("");

    const fetchUsers = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return res.json();
    };

    const [isLoading, setLoading] = useState(true);
    const [cfData, setCfData] = useState(["", "", "", 0]);
    const [page, setPage] = useState(1);


    const [allowAccess, setAllowedAccess] = useState(false);
    const [instaStatus, setInstaStatus] = useState(false);

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');

    const responseFacebook = (response) => {
        // console.log(response);
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }

    // App state
    const [fbUserAccessToken, setFbUserAccessToken] = useState("");
    const [fbPageAccessToken, setFbPageAccessToken] = useState();
    const [pageId, setPageId] = useState();

    // Logs in a Facebook user
    const logInToFB = useCallback(() => {
        window.FB.login((response) => {

            setFbUserAccessToken(response.authResponse.accessToken);
            console.log("printing user access token");
            console.log(fbUserAccessToken);
        }, { scope: 'instagram_basic,pages_show_list,instagram_manage_insights,pages_read_engagement', enable_profile_selector: true });
    }, []);

    // Logs out the current Facebook user
    const logOutOfFB = useCallback(() => {
        window.FB.logout(() => {
            setFbUserAccessToken(null);
            setFbPageAccessToken(null);
        });
    }, []);

    // Checks if the user is logged in to Facebook
    useEffect(() => {
        if (isFbSDKInitialized) {
            window.FB.getLoginStatus((response) => {
                setFbUserAccessToken(response.authResponse?.accessToken);
            });
        }
    }, [isFbSDKInitialized]);

    useEffect(() => {
        if (fbUserAccessToken != "") {
            getId();
        }
    }, [fbUserAccessToken]);


    async function getId() {
        window.FB.api('/me/accounts?access_token=' + fbUserAccessToken, function (response) {
            // console.log("response id")

            let pId = response.data[0].id;
            // console.log(pId);

            window.FB.api('/' + pId + '?fields=instagram_business_account&access_token=' + fbUserAccessToken, function (response) {
                // console.log("starting page ID");
                // console.log(response);
                // console.log("ending page ID");

                setPageId(response.instagram_business_account.id);
            })
        });
    }


    async function businessDiscovery(username, index) {
        // console.log("inside business discovery");
        // console.log(username);
        // console.log("printing fb page access token");
        // console.log(fbUserAccessToken);
        // console.log("printing page ID");
        // console.log(pageId);
        window.FB.api('/' + pageId + '?fields=business_discovery.username(' + username + '){followers_count,media_count,media{comments_count,like_count,caption}}&access_token=' + fbUserAccessToken, await function (response) {
            if (response && !response.error) {
                // console.log(response.business_discovery.followers_count);
                let followerCount = response.business_discovery.followers_count;
                // console.log("printing cfData");

                let temp = cfData;
                const newCFData = cfData.map((item, i) => {
                    // console.log(i);
                    if (i == index) {
                        return [item[0], item[1], item[2], followerCount]
                    }
                    else {
                        return [item[0], item[1], item[2], item[3]]
                    }
                });
                //let temp2 = [["1", "2", "Personal", 1023], ["3", "4", "Personal", 2048], ["4", "5", "Personal", 3089]]
                setCfData(newCFData);
            }
            else {

                // console.log("error occurred");
            }
        })
    }

    async function getData(username, index) {
        businessDiscovery(username, index);
    }


    React.useEffect(() => {
        if (isFbSDKInitialized) {
            window.FB.getLoginStatus((response) => {
                setFbUserAccessToken(response.authResponse?.accessToken);
            });
        }
    }, [isFbSDKInitialized]);




    // if (isLoading) {
    //     return (
    //         <div className="content">
    //             <Card>
    //                 <CardBody style={{
    //                     maxHeight: '700px',
    //                     overflowY: 'auto',
    //                     color: "white"
    //                 }}>
    //                     <h1>
    //                         Loading....
    //                     </h1>
    //                 </CardBody>
    //             </Card>
    //         </div>
    //     );
    // }

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ display: "flex", padding: "1.25rem", justifyContent: "left" }}>
                    <Heading>Overview (All Time)</Heading>
                </div>
                <div style={{ display: "flex", padding: "1.25rem", justifyContent: "right" }}>
                    {fbUserAccessToken ? (
                        <Button onClick={logOutOfFB} size="slim" icon={<img style={{ marginRight: "5px", height: "40px", width: "40px" }} src="https://img.icons8.com/ios/50/40C057/checkmark--v1.png" />}>Connected. Click to Logout</Button>
                    ) : (
                        <Button onClick={logInToFB} size="slim" icon={<img style={{ marginRight: "5px", height: "40px", width: "40px" }} src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" />}>Connect your Instagram</Button>
                    )}
                </div>
            </div>

            <Stack distribution="fillEvenly">
                <Stack.Item>
                    <div style={{ height: "100px" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexDirection: "column",
                            backgroundColor: "var(--p-surface-subdued)"
                        }}>
                            <span style={{
                                fontSize: "var(--p-font-size-7)",
                                fontWeight: "600",
                                marginBottom: "5px"
                            }}>213</span>
                            <h2 style={{ fontSize: "14px" }}>Total Creators</h2>
                        </div>
                    </div>
                </Stack.Item>
                <Stack.Item>
                    <div style={{ height: "100px" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexDirection: "column",
                            backgroundColor: "var(--p-surface-subdued)"
                        }}>
                            <span style={{
                                fontSize: "var(--p-font-size-7)",
                                fontWeight: "600",
                                marginBottom: "5px"
                            }}>100</span>
                            <h2 style={{ fontSize: "14px" }}>Creators Accessed</h2>
                        </div>
                    </div>
                </Stack.Item>
                <Stack.Item>
                    <div style={{ height: "100px" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexDirection: "column",
                            backgroundColor: "var(--p-surface-subdued)"
                        }}>
                            <span style={{
                                fontSize: "var(--p-font-size-7)",
                                fontWeight: "600",
                                marginBottom: "5px"
                            }}>Rs. 1,09,000</span>
                            <h2 style={{ fontSize: "14px" }}>Total Sales Generated</h2>
                        </div>
                    </div>
                </Stack.Item>
                <Stack.Item>
                    <div style={{ height: "100px" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            flexDirection: "column",
                            backgroundColor: "var(--p-surface-subdued)"
                        }}>
                            <span style={{
                                fontSize: "var(--p-font-size-7)",
                                fontWeight: "600",
                                marginBottom: "5px"
                            }}>0</span>
                            <h2 style={{ fontSize: "14px" }}>Total applicants</h2>
                        </div>
                    </div>
                </Stack.Item>
            </Stack>
        </>
    );
}

export default Tab3;

