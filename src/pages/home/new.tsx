import React from 'react'
import { useTranslation } from 'react-i18next';

import { Stack, Text } from '@fluentui/react';
import { MapMethodologiesToCards } from './methodologies';

export default function NewPage() {
        
    const { t } = useTranslation("navbar");

    return <React.Fragment>
        <Text variant='xLarge'>{t("new")}</Text>
        <Stack horizontal>
            <MapMethodologiesToCards />
        </Stack>
    </React.Fragment>
}


