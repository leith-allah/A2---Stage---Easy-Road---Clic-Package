
import {

    TRANSPORT_RULES,

} from "./package.rules";

import type {

    TransportErrors,

    TransportValidator,

} from "./types";

export const validateTransport: TransportValidator = (

    data,

) => {

    const errors: TransportErrors = {};

    /*
    =====================================================
    Transport complètement vide
    =====================================================
    */

    const isEmpty =

        !data.route.trim() &&
        !data.company.trim();

    if (isEmpty) {

        return {};

    }

    /*
    =====================================================
    Trajet
    =====================================================
    */

    const route = data.route.trim();

    if (!route) {

        errors.route =
            "Le trajet est obligatoire.";

    }

    else if (

        route.length < TRANSPORT_RULES.ROUTE.MIN

    ) {

        errors.route =
            `Le trajet doit contenir au moins ${TRANSPORT_RULES.ROUTE.MIN} caractères.`;

    }

    else if (

        route.length > TRANSPORT_RULES.ROUTE.MAX

    ) {

        errors.route =
            `Le trajet ne peut pas dépasser ${TRANSPORT_RULES.ROUTE.MAX} caractères.`;

    }

    /*
    =====================================================
    Compagnie
    =====================================================
    */

    if (

        data.company &&
        data.company.length >
        TRANSPORT_RULES.COMPANY.MAX

    ) {

        errors.company =
            `Le nom de la compagnie ne peut pas dépasser ${TRANSPORT_RULES.COMPANY.MAX} caractères.`;

    }

    return errors;

};
