import React from 'react'

import { Link } from '@fluentui/react'
import { useTranslation } from 'react-i18next'

const link = "https://www.international.gc.ca/world-monde/funding-financement/results_based_management-gestion_axee_resultats.aspx?lang=eng"

export default function Contact() {
    
    const { t } = useTranslation('tutorials', { keyPrefix: 'contact'})
    
    return (
        <Link href={link} target='_blank'>
            {t('oficialpage')}
        </Link>
    )
}
