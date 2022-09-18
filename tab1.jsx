import SortTab from "./sortTab";
import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    RangeSlider,
    Card,
    Thumbnail,
    TextField,
    Stack,
    Select
} from "@shopify/polaris";

import React, { useEffect, useState, useCallback } from "react";

export function Tab1() {

    const customers = [
        {
            id: '3413',
            url: 'customers/341',
            name: 'Mae Jemison',
            orders: 2003,
            amountSpent: '2,400',
        },
        {
            id: '2563',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            orders: 3072,
            amountSpent: '140',
        },
        {
            id: '2563',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            orders: 3072,
            amountSpent: '140',
        },
        {
            id: '2563',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            orders: 3072,
            amountSpent: '140',
        },
        {
            id: '2563',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            orders: 3072,
            amountSpent: '140',
        },
        {
            id: '2563',
            url: 'customers/256',
            name: 'Tarini Shah',
            orders: 3072,
            amountSpent: '140',
        },
        {
            id: '1999',
            url: 'customers/256',
            name: 'Harshaala',
            orders: 6969,
            amountSpent: '10000',
        },
    ];
    const resourceName = {
        singular: 'customer',
        plural: 'customers',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    const promotedBulkActions = [
        {
            content: 'Save creators',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];
    const bulkActions = [
        {
            content: 'Add tags',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Remove tags',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            content: 'Delete customers',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ];

    const rowMarkup = customers.map(
        ({ id, name, orders, amountSpent }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Stack>
                        <Stack.Item>
                            <div style={{ marginTop: "3px", padding: "5px", margin: "auto", justifyContent: "left" }}>
                                <img src="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" alt="Black choker necklace" style={{ borderRadius: "50%", height: "45px", width: "45px" }} />
                            </div>
                        </Stack.Item>
                        <Stack.Item>
                            <div style={{ marginTop: "5px", padding: "5px" }}>
                                <TextStyle variation="strong">{name}</TextStyle>
                            </div>
                            <div style={{ paddingLeft: "5px", paddingBottom: "5px" }}>
                                <TextStyle >{name}</TextStyle>
                            </div>
                        </Stack.Item>
                    </Stack>
                </IndexTable.Cell>
                <IndexTable.Cell>{orders}</IndexTable.Cell>
                <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
                <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );


    return (
        <>
            <SortTab />

            <IndexTable
                resourceName={resourceName}
                itemCount={customers.length}
                selectedItemsCount={
                    allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                bulkActions={bulkActions}
                promotedBulkActions={promotedBulkActions}
                headings={[
                    { title: 'Creator' },
                    { title: 'Followers' },
                    { title: 'Avg. Engagement' },
                    { title: 'Media Count' },
                ]}
            >
                {rowMarkup}
            </IndexTable>
        </>
    );
}

export default Tab1;

