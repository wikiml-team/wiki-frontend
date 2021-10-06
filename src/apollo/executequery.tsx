import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from "@apollo/client";
import { DocumentNode } from 'graphql'
import { ProgressIndicator } from '@fluentui/react';

type ExecuteQueryProps = {
    query: DocumentNode,
    applyToData?: (data: any) => ReactElement
}

export default function ExecuteQuery(props: ExecuteQueryProps) {

    const { query, applyToData } = props;

    const { loading, error, data } = useQuery(query);
    const { t } = useTranslation("loading")

    if (loading) {
        return <ProgressIndicator
                label={t("loading-title")} 
                description={t("loading-description")} />
    }
    
    if (error) return <p>Error :(</p>;

    return applyToData? applyToData(data) : data
}
