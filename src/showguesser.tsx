import * as React from 'react';
import {
    ShowBase,
    InferredElement,
    getElementsFromRecords,
    useResourceContext,
    useShowContext,
} from 'ra-core';

import { ShowProps, ShowView, showFieldTypes } from 'react-admin';

export const CustomShowGuesser = ({
    id,
    queryOptions,
    resource,
    ...rest
}: Omit<ShowProps, 'children'> & { enableLog?: boolean }) => (
    <ShowBase id={id} resource={resource} queryOptions={queryOptions}>
        <CustomShowViewGuesser {...rest} />
    </ShowBase>
);

const CustomShowViewGuesser = (
    props: Omit<ShowProps, 'children'> & { enableLog?: boolean }
) => {
    const resource = useResourceContext(props);
    const { record } = useShowContext();

    if (!record) {
        return null;
    }

    const inferredElements = getElementsFromRecords([record], showFieldTypes);
    const inferredChild = new InferredElement(
        showFieldTypes.show,
        null,
        inferredElements
    );
    const child = inferredChild.getElement();

    const { enableLog = process.env.NODE_ENV === 'development' } = props;

    if (enableLog) {
        const representation = inferredChild.getRepresentation();
        const components = Array.from(
            new Set(
                Array.from(representation.matchAll(/<([^/\s>]+)/g))
                    .map(match => match[1])
                    .filter(component => component !== 'span')
            )
        ).sort();

        console.log(`Guessed Show Component:

import { ${components.join(', ')} } from 'react-admin';

const ${resource}Show = () => (
    <Show>
        ${representation}
    </Show>
);`);
    }

    return <ShowView {...props}>{child}</ShowView>;
};
