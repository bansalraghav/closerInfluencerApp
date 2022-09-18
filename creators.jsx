import Tab1 from "./tab1";
import Tab2 from "./tab2";
import Tab3 from "./tab3";
import Tab4 from "./tab4";
import Dates from "./dates";
import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    Heading,
    Card,
    Tabs,
    Thumbnail,
    Stack,
    Badge
} from "@shopify/polaris";

import React, { useEffect, useState, useCallback } from "react";

export function Creator() {


    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all-creators-1',
            content: 'All Creators',
            panelID: 'all-creators-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Saved Creators',
            panelID: 'accepts-marketing-content-1',
        },
        {
            id: 'repeat-customers-1',
            content: 'Campaign Deets',
            panelID: 'repeat-customers-content-1',
        }, {
            id: 'coupons',
            content: 'Coupons',
            panelID: 'repeat-customers-content-1',
        }
    ];


    return (
        <>
            <div style={{ padding: "15px", display: "flex", justifyContent: "left" }}>
                <Heading>Discover Creators</Heading>
            </div>
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section>
                        {selected == 0 && <Tab1 />}
                        {selected == 1 && <Tab2 />}
                        {selected == 2 && <Tab3 />}
                        {selected == 3 && <Tab4 />}
                    </Card.Section>
                </Tabs>
            </Card>
        </>
    );

}

export default Creator;

