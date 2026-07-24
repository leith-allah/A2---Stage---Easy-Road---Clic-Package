
/* =======================================================
   PACKAGE
======================================================= */

export const PACKAGE_RULES = {

    NAME: {

        MIN: 3,

        MAX: 100,

    },

    DESCRIPTION: {

        MIN: 20,

        MAX: 5000,

    },

    PRICE: {

        MIN: 0,

        MAX: 1_000_000,

    },

    STOCK: {

        MIN: 1,

        MAX: 100000,

    },

};

/* =======================================================
   FLIGHT
======================================================= */

export const FLIGHT_RULES = {

    FLIGHT_NUMBER: {

        MIN: 2,

        MAX: 20,

    },

};

/* =======================================================
   HOTEL
======================================================= */

export const HOTEL_RULES = {

    NAME: {

        MIN: 2,

        MAX: 120,

    },

    COUNTRY: {

        MIN: 2,

        MAX: 100,

    },

    CITY: {

        MIN: 2,

        MAX: 100,

    },

    ADDRESS: {

        MIN: 5,

        MAX: 255,

    },

    STARS: {

        MIN: 1,

        MAX: 7,

    },

};

/* =======================================================
   TRANSPORT
======================================================= */

export const TRANSPORT_RULES = {

    ROUTE: {

        MIN: 2,

        MAX: 150,

    },

    COMPANY: {

        MAX: 120,

    },

};

/* =======================================================
   EXCURSION
======================================================= */

export const EXCURSION_RULES = {

    NAME: {

        MIN: 2,

        MAX: 120,

    },

    LOCATION: {

        MIN: 2,

        MAX: 120,

    },

    DESCRIPTION: {

        MIN: 10,

        MAX: 3000,

    },

};

/* =======================================================
   WIZARD
======================================================= */

export const WIZARD_RULES = {

    /*
        Au moins une de ces étapes
        doit contenir un élément.
    */

    MIN_CONTENT: 1,

};
