import { useTranslation } from "react-i18next";

import { ProgressIndicator } from "@fluentui/react";
import { ApolloError } from "@apollo/client";

type StateIndicatorProps = {
    data?: any,
    loading?: boolean,
    error?: ApolloError,
    errorMessage?: string
}

export default function QueryStateIndicator(props: StateIndicatorProps) {

    const {data, loading, error, errorMessage } = props;

    const { t } = useTranslation("basics", { keyPrefix: "loading" })

    if (loading) {
        return <ProgressIndicator
            label={t("title")} 
            description={t("description")} />
    
    }
    if (error) {
        const message = errorMessage?? error.name + '\n ' + error?.message;
        return <p>{`${t("error")}: ${message}`}</p>
    }

    if (!data) {
        return <p>{t("nodata")}</p>
    }

    return <></>

}