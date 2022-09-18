import { Dates } from "./dates";
import {
    Stack,
    RangeSlider,
    Card,
    TextField,
    Select,
    Button,
    Popover,
    ActionList,
    FormLayout
} from "@shopify/polaris";

import React, { useEffect, useState, useCallback } from "react";

export function SortTab() {


    const initialValue = [0, 20000];
    const prefix = '0';
    const suffix = '20K';
    const min = 0;
    const max = 20000;
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




    const [selected, setSelected] = useState('followers');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        { label: 'Followers', value: 'followers' },
        { label: 'Avg. Engagement', value: 'engagement' }
    ];


    return (
        <>
            <Stack>
                <Stack.Item>
                    <div style={{ height: "100px" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px",
                            flexDirection: "column"
                        }}>
                            <Select
                                label="Sort by"
                                labelInline
                                options={options}
                                onChange={handleSelectChange}
                                value={selected}
                            />
                        </div>
                    </div>
                </Stack.Item>
                <Stack.Item>
                    <div style={{ alignItems: "right" }}>
                        <div style={{
                            border: "1px solid transparent",
                            padding: "16px"
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
        </>
    );
}

export default SortTab;
