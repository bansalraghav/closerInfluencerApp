import {
    DatePicker,
    RangeSlider,
    Button,
    Stack,
    Heading,
    Popover,
    TextField,
    Card
} from "@shopify/polaris";
import gql from "graphql-tag";

import React, { useEffect, useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import axios from 'axios';


export function Tab4() {

    const CREATE_COUPON = gql`
    mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
        discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
          codeDiscountNode {
            id
            codeDiscount {
              ... on DiscountCodeBasic {
                title 
                codes(first:10) {
                  nodes {
                    code
                  }
                }
                startsAt
                endsAt
                customerSelection {
                  ... on DiscountCustomerAll {
                    allCustomers
                  }
                }
                customerGets {
                  value {
                    ... on DiscountPercentage {
                      percentage
                    }
                  }
                  items {
                    ... on AllDiscountItems {
                      allItems
                    }
                  }
                }
                appliesOncePerCustomer
              }
            }
          }
                userErrors {
                    field
                    code
                    message
                }
        }
      }`;

    const DISCOUNT_BULK_ADD = gql`
    mutation discountRedeemCodeBulkAdd($codes: [DiscountRedeemCodeInput!]!, $discountId: ID!) {
        discountRedeemCodeBulkAdd(codes: $codes, discountId: $discountId) {
        bulkCreation {
            id
        }
        userErrors {
            code
            field
            message
        }
        }
    }`;

    const [createCoupon] = useMutation(CREATE_COUPON);
    const [addBulk] = useMutation(DISCOUNT_BULK_ADD);


    const [discount, setDiscount] = useState('15');
    const handleDiscount = useCallback((newDiscount) => setDiscount(newDiscount), []);

    const [title, setTitle] = useState("Closer Influencer Marketing");
    const handleTitle = useCallback((newTitle) => setTitle(newTitle), []);

    const [noCreators, setNoCreators] = useState("100");
    const handleCreators = useCallback((newDiscount) => setNoCreators(newDiscount), []);

    const creatorsData = [
        ["therealkritikakapoor", "kkapoor277@gmail.com", 180.48, 1000, "Kritika", 185],
        ["prakrit_patelofficial", "ramveera18887@gmail.com", 46.6, 999, "Viral ", 141],
        ["makeupartistrybydeeptianeja", "deepti.anejaa@gmail.com", 60.28, 997, "Deepti ", 458],
        ["shubbhz_025", "tganesh2521@gmail.com", 277.52, 994, "Ganesh ", 37],
        ["nitugupta_makeovers", "guptanitugupta97@gmail.com", 79.72, 992, "Nitu", 208],
        ["biju_j_vaghela0075", "bijalbarai1997@gmail.com", 75.12, 991, "Barai", 157],
        ["indutomar", "indutomar143@gmail.com", 61.32, 988, "Indu", 248],
        ["cheshta2002", "chesta.13.04@gmail.com", 271.8333333333333, 988, "Cheshta ", 6],
        ["nvshakangel", "nvshakangel20@gmail.com", 55.88, 988, "Anwesha", 389],
        ["iqra.khan.2606", "zebyk1996@gmail.com", 144.6, 988, "Iqra ", 223],
        ["iammayurkrishna", "iammayurkrishna@gmail.com", 4.76, 987, "MAYUR", 164],
        ["monikagupta637", "monikaguptalko1986@gmail.com", 20.12, 986, "Monika ", 466],
        ["mm_themysticgal", "monisha.mm90@gmail.com", 87.05555555555556, 986, "Monisha", 18],
        ["reela_tage", "reelatage507@gmail.com", 184.5, 985, "Tage", 9],
        ["_negi_nikita23", "nikitapauri@gmail.com", 136.4, 983, "Nikita", 112],
        ["ezzyest_writes", "husainaezzy026@gmail.com", 150, 982, "Husaina", 170],
        ["dramalanancy", "nancyamala.92@gmail.com", 97.84, 982, "Amy", 49],
        ["suchip96", "suchip96@gmail.com", 69.2, 981, "Suchitaa", 84],
        ["ramcharanladycultfan_bhanuasha", "bhanuasha123@gmail.com", 60.16, 981, "B", 653],
        ["seamless_glam", "anjalilakhina12345@gmail.com", 185.12, 981, "Anjali", 170]
    ];

    const creatorCodes = [];

    for (var i = 0; i < creatorsData.length; i++) {
        creatorsData[i][4] = creatorsData[i][4].replace(/ /g, '');
        creatorCodes.push({ code: creatorsData[i][4] + discount });
    }

    // console.log(creatorCodes);

    for (var i = 0; i < creatorsData.length; i++) {
        creatorsData[i].push(creatorCodes[i].code);
    }

    // console.log(creatorsData);

    const handleCreateCoupon = () => {

        createCoupon({
            variables: {
                basicCodeDiscount: {
                    title: title,
                    code: creatorCodes[0].code,
                    startsAt: selectedDates.start,
                    endsAt: selectedDates.end,
                    customerSelection: {
                        all: true
                    },
                    customerGets: {
                        value: {
                            percentage: discount * 0.01
                        },
                        items: {
                            all: true
                        }
                    },
                    appliesOncePerCustomer: true
                }
            }
        }).then((response) => handleBulkAdd(response.data.discountCodeBasicCreate.codeDiscountNode.id));
    };

    const handleBulkAdd = (disId) => {
        // console.log(disId);
        addBulk({
            variables: {
                codes: creatorCodes,
                discountId: disId
            }
        })
        console.log("created coupons");
    };


    const initialValue = [0, 600000];
    const prefix = '0';
    const suffix = '600K';
    const min = 0;
    const max = 600000;
    const step = 10;

    const [intermediateTextFieldValue, setIntermediateTextFieldValue] =
        useState(initialValue);
    const [rangeValue, setRangeValue] = useState(initialValue);

    const handleRangeSliderChange = useCallback((value) => {
        setRangeValue(value);
        setIntermediateTextFieldValue(value);
    }, []);

    const handleLowerTextFieldChange = useCallback(
        (value) => {
            const upperValue = rangeValue[1];
            setIntermediateTextFieldValue([parseInt(value, 10), upperValue]);
        },
        [rangeValue],
    );

    const handleUpperTextFieldChange = useCallback(
        (value) => {
            const lowerValue = rangeValue[0];
            setIntermediateTextFieldValue([lowerValue, parseInt(value, 10)]);
        },
        [rangeValue],
    );

    const handleLowerTextFieldBlur = useCallback(() => {
        const upperValue = rangeValue[1];
        const value = intermediateTextFieldValue[0];

        setRangeValue([parseInt(value, 10), upperValue]);
    }, [intermediateTextFieldValue, rangeValue]);

    const handleUpperTextFieldBlur = useCallback(() => {
        const lowerValue = rangeValue[0];
        const value = intermediateTextFieldValue[1];

        setRangeValue([lowerValue, parseInt(value, 10)]);
    }, [intermediateTextFieldValue, rangeValue]);

    const handleEnterKeyPress = useCallback(
        (event) => {
            const newValue = intermediateTextFieldValue;
            const oldValue = rangeValue;

            if (event.keyCode === Key.Enter && newValue !== oldValue) {
                setRangeValue(newValue);
            }
        },
        [intermediateTextFieldValue, rangeValue],
    );

    const lowerTextFieldValue =
        intermediateTextFieldValue[0] === rangeValue[0]
            ? rangeValue[0]
            : intermediateTextFieldValue[0];

    const upperTextFieldValue =
        intermediateTextFieldValue[1] === rangeValue[1]
            ? rangeValue[1]
            : intermediateTextFieldValue[1];



    // Date picker start

    const [{ month, year }, setDate] = useState({ month: 8, year: 2022 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date('Wed Sep 24 2022 00:00:00 GMT-0500 (EST)'),
        end: new Date('Wed Oct 04 2022 00:00:00 GMT-0500 (EST)'),
    });

    const handleMonthChange = useCallback(
        (month, year) => setDate({ month, year }),
        [],
    );


    const [active, setActive] = useState(false);
    const toggleActive = useCallback(() => setActive((active) => !active), []);
    const activator = (
        <Button onClick={toggleActive} disclosure>
            Select Campaign Dates
        </Button>
    );


    return (
        <>
            {/* <div style={{ display: "flex", justifyContent: "left" }}>
                <h1 style={{ fontSize: "18px", fontWeight: "800" }}>Create Coupons</h1>
            </div> */}
            <div style={{ marginTop: "30px" }}>
                <Stack distribution="fillEvenly">
                    <Stack.Item>
                        <div style={{ height: "200px" }}>
                            <div style={{
                                border: "1px solid transparent",
                                padding: "16px",
                                height: "200px",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                flexDirection: "column",
                                backgroundColor: "var(--p-surface-subdued)"
                            }}>
                                <div style={{ marginTop: "55px", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{
                                        fontSize: "18px",
                                        fontWeight: "600",
                                        marginBottom: "5px",
                                    }}>COUPON TITLE</span>
                                </div>
                                <TextField
                                    width="200px"
                                    value={title}
                                    onChange={handleTitle}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </Stack.Item>
                    <Stack.Item>
                        <div style={{ height: "200px" }}>
                            <div style={{
                                border: "1px solid transparent",
                                padding: "16px",
                                display: "flex",
                                height: "200px",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                flexDirection: "column",
                                backgroundColor: "var(--p-surface-subdued)"
                            }}>
                                <span style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    marginBottom: "5px"
                                }}>ENTER DISCOUNT PERCENTAGE</span>
                                <TextField
                                    value={discount}
                                    onChange={handleDiscount}
                                    autoComplete="off"
                                    suffix="%"
                                />
                            </div>
                        </div>
                    </Stack.Item>
                    <Stack.Item>
                        <div style={{ height: "200px" }}>
                            <div style={{
                                border: "1px solid transparent",
                                padding: "16px",
                                height: "200px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                flexDirection: "column",
                                backgroundColor: "var(--p-surface-subdued)"
                            }}>
                                <span style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                    marginBottom: "5px"
                                }}>ENTER NUMBER OF CREATORS</span>
                                <TextField
                                    width="200px"
                                    value={noCreators}
                                    onChange={handleCreators}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </Stack.Item>
                </Stack>

                <div style={{ marginTop: "40px" }}>

                </div>


                <Stack distribution="fillEvenly">
                    <Stack.Item>
                        <div style={{ height: "200px" }}>
                            <div style={{
                                border: "1px solid transparent",
                                padding: "16px",
                                display: "flex",
                                height: "200px",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                flexDirection: "column",
                                backgroundColor: "var(--p-surface-subdued)"
                            }}>
                                <Popover
                                    active={active}
                                    activator={activator}
                                    autofocusTarget="first-node"
                                    onClose={toggleActive}
                                    fluidContent
                                >
                                    <div style={{ width: "600px", padding: "30px" }}>
                                        <DatePicker
                                            month={month}
                                            year={year}
                                            onChange={setSelectedDates}
                                            onMonthChange={handleMonthChange}
                                            selected={selectedDates}
                                            multiMonth
                                            allowRange
                                        />
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </Stack.Item>
                    <Stack.Item>
                        <div style={{ height: "200px" }}>
                            <div style={{
                                border: "1px solid transparent",
                                padding: "16px",
                                height: "200px",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                flexDirection: "column",
                                backgroundColor: "var(--p-surface-subdued)"
                            }}>
                                <Card sectioned title="Instagram Followers Range">
                                    <div onKeyDown={handleEnterKeyPress}>
                                        <RangeSlider
                                            value={rangeValue}
                                            prefix={prefix}
                                            suffix={suffix}
                                            min={min}
                                            max={max}
                                            step={step}
                                            onChange={handleRangeSliderChange}
                                        />
                                        <Stack distribution="equalSpacing" spacing="extraLoose">
                                            <TextField
                                                type="number"
                                                value={`${lowerTextFieldValue}`}
                                                min={min}
                                                max={max}
                                                step={step}
                                                onChange={handleLowerTextFieldChange}
                                                onBlur={handleLowerTextFieldBlur}
                                                autoComplete="off"
                                            />
                                            <TextField
                                                type="number"
                                                value={`${upperTextFieldValue}`}
                                                min={min}
                                                max={max}
                                                step={step}
                                                onChange={handleUpperTextFieldChange}
                                                onBlur={handleUpperTextFieldBlur}
                                                autoComplete="off"
                                            />
                                        </Stack>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Stack.Item>
                </Stack>


                <div style={{ display: "flex", padding: "1.5rem", justifyContent: "left" }}>
                    <button onClick={() => {
                        handleCreateCoupon()
                    }} style={{ cursor: "pointer", height: "48px", borderRadius: "56px", color: "white", fontWeight: "700", border: "none", width: "220px", margin: "0px auto", background: "rgb(0, 107, 255)", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                        Create Coupons
                    </button>
                </div>
            </div>
        </>
    );
}

export default Tab4;


{/* <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 8fr" }}>
<div style={{ display: "flex", padding: "1.25rem", justifyContent: "left" }}>
    <Card>
        <div style={{
            border: "1px solid transparent",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
        }}>
            <span style={{
                fontSize: "var(--p-font-size-7)",
                fontWeight: "600",
                marginBottom: "5px"
            }}>Coupon Title</span>
            <h2 style={{ fontSize: "14px" }}>Closer Influencer {discount}</h2>
        </div>
    </Card>
</div>
<div style={{ display: "flex", padding: "1.25rem", justifyContent: "left" }}>
    <Card>
        <div style={{
            border: "1px solid transparent",
            padding: "16px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
        }}>
            <span style={{
                fontSize: "var(--p-font-size-7)",
                fontWeight: "600",
                marginBottom: "5px"
            }}>Creators for this Campaign</span>
            <h2 style={{ fontSize: "14px" }}>100</h2>
        </div>
    </Card>
</div>
<div style={{ display: "flex", padding: "1.25rem", justifyContent: "left" }}>
    <TextField
        label="Enter Discount Percentage"
        value={discount}
        onChange={handleDiscount}
        autoComplete="off"
        suffix="%"
    />
</div>
</div> */}