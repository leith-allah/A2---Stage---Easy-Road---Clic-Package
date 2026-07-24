
-- =========================
-- CLIC PACKAGE DATABASE
-- SCHEMA
-- =========================

-- =========================
-- TABLES MONDIALES
-- =========================

CREATE TABLE pays (
    id_pays SMALLINT PRIMARY KEY,

    code_iso2_pays CHAR(2) NOT NULL UNIQUE,
    code_iso3_pays CHAR(3) NOT NULL UNIQUE,

    nom_pays VARCHAR(100) NOT NULL UNIQUE,

    indicatif_tel_pays VARCHAR(10) NOT NULL
);

CREATE TABLE ville (
    id_ville INTEGER PRIMARY KEY,

    code_iata_ville CHAR(3),

    nom_ville VARCHAR(100) NOT NULL,

    latitude_ville double PRECISION NOT NULL,
    longitude_ville double PRECISION NOT NULL,

    fuseau_horaire_ville VARCHAR(50) NOT NULL,

    id_pays SMALLINT NOT NULL
        REFERENCES pays(id_pays)
        ON DELETE RESTRICT
);

CREATE TABLE aeroport (
    id_aeroport SMALLINT PRIMARY KEY,

    code_iata_aeroport CHAR(3) NOT NULL UNIQUE,
    code_icao_aeroport CHAR(4) NOT NULL UNIQUE,

    nom_aeroport VARCHAR(150) NOT NULL,

    latitude_aeroport double PRECISION NOT NULL,
    longitude_aeroport double PRECISION NOT NULL,

    id_ville INTEGER NOT NULL
        REFERENCES ville(id_ville)
        ON DELETE RESTRICT,

    UNIQUE(nom_aeroport, id_ville)
);

CREATE TABLE compagnie_aerienne (
    id_compagnie SMALLINT PRIMARY KEY,

    code_iata_compagnie CHAR(2) NOT NULL UNIQUE,
    code_icao_compagnie CHAR(4) NOT NULL UNIQUE,

    nom_compagnie VARCHAR(100) NOT NULL UNIQUE,

    site_compagnie VARCHAR(255)
);

-- =========================
-- TABLES DE BASE
-- =========================

CREATE TABLE vol (
    id_vol BIGSERIAL PRIMARY KEY,

    statut_vol VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',

    num_vol VARCHAR(10) NOT NULL,

    depart_vol TIMESTAMP NOT NULL,
    arrivee_vol TIMESTAMP NOT NULL,

    id_aeroport_depart SMALLINT NOT NULL
        REFERENCES aeroport(id_aeroport)
        ON DELETE RESTRICT,

    id_aeroport_arrivee SMALLINT NOT NULL
        REFERENCES aeroport(id_aeroport)
        ON DELETE RESTRICT,

    id_compagnie SMALLINT NOT NULL
        REFERENCES compagnie_aerienne(id_compagnie)
        ON DELETE RESTRICT,

    CHECK (depart_vol < arrivee_vol),

    UNIQUE(num_vol, depart_vol)
);

CREATE TABLE transport (
    id_transp BIGSERIAL PRIMARY KEY,
    trajet_transp VARCHAR(50) NOT NULL,
    societe_transp VARCHAR(50)
);

CREATE TABLE hotel (
    id_hot BIGSERIAL PRIMARY KEY,
    nom_hot VARCHAR(100) NOT NULL,
    nb_etoiles_hot SMALLINT NOT NULL CHECK (nb_etoiles_hot BETWEEN 1 AND 7),
    pays_hot VARCHAR(50) NOT NULL,
    ville_hot VARCHAR(50) NOT NULL,
    adresse_hot VARCHAR(255) NOT NULL
);

CREATE TABLE excursion (
    id_exc BIGSERIAL PRIMARY KEY,
    nom_exc VARCHAR(255) NOT NULL,
    lieu_exc VARCHAR(50) NOT NULL,
    description_exc TEXT NOT NULL
);

-- =========================
-- UTILISATEURS
-- =========================

CREATE TABLE role (
    id_role BIGSERIAL PRIMARY KEY,
    nom_role VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE agence (
    id_agence BIGSERIAL PRIMARY KEY,
    mle_agence VARCHAR(255) NOT NULL UNIQUE,
    nom_agence VARCHAR(50) NOT NULL,
    dc_agence DATE NOT NULL,
    sj_agence VARCHAR(30) NOT NULL
);

CREATE TABLE bureau_agence (
    id_bureau BIGSERIAL PRIMARY KEY,
    mle_bureau VARCHAR(255) NOT NULL UNIQUE,
    type_bureau VARCHAR(50) NOT NULL,
    dc_bureau DATE NOT NULL,
    pays_bureau VARCHAR(50) NOT NULL,
    ville_bureau VARCHAR(50) NOT NULL,
    adresse_bureau VARCHAR(255) NOT NULL,
    num_agr_bureau VARCHAR(50) NOT NULL UNIQUE,
    rib_agence VARCHAR(30),
    iban_agence VARCHAR(34),
    dcc_bureau DATE NOT NULL,
    id_agence BIGINT NOT NULL
        REFERENCES agence(id_agence)
        ON DELETE CASCADE
);

CREATE TABLE utilisateur (
    id_user BIGSERIAL PRIMARY KEY,
    mle_user VARCHAR(255) NOT NULL UNIQUE,
    nin_user VARCHAR(30) NOT NULL UNIQUE,
    nom_user VARCHAR(50) NOT NULL,
    prenom_user VARCHAR(50) NOT NULL,
    ddn_user DATE NOT NULL,
    nat_user VARCHAR(50) NOT NULL,
    statut_user VARCHAR(50) NOT NULL,
    email_pro_user VARCHAR(50) NOT NULL UNIQUE,
    mdp_user TEXT NOT NULL,
    dcc_user DATE NOT NULL,

    id_role BIGINT NOT NULL
        REFERENCES role(id_role),

    id_bureau BIGINT NOT NULL
        REFERENCES bureau_agence(id_bureau)
);

-- =========================
-- FINANCE
-- =========================

CREATE TABLE portefeuille (
    id_prtfl BIGSERIAL PRIMARY KEY,
    num_prtfl VARCHAR(255) NOT NULL UNIQUE,

    solde_total_prtfl NUMERIC(10,2) NOT NULL DEFAULT 0
        CHECK (solde_total_prtfl >= 0),

    derniere_maj_prtfl TIMESTAMP NOT NULL,

    id_user BIGINT NOT NULL UNIQUE
        REFERENCES utilisateur(id_user)
        ON DELETE CASCADE
);

CREATE TABLE demande_rechargement (
    id_demande_recharge BIGSERIAL PRIMARY KEY,
    statut_demande_recharge VARCHAR(50) NOT NULL,
    montant_demande_recharge NUMERIC(10,2) NOT NULL,
    date_heure_demande_recharge TIMESTAMP NOT NULL,
    comment_demande_recharge TEXT,

    id_user BIGINT NOT NULL
        REFERENCES utilisateur(id_user)
        ON DELETE RESTRICT
);

CREATE TABLE demande_creation_compte (

    id_demande_creation BIGSERIAL PRIMARY KEY,

    statut_demande_creation VARCHAR(50) NOT NULL,

    nom_user VARCHAR(50) NOT NULL,
    prenom_user VARCHAR(50) NOT NULL,

    ddn_user DATE NOT NULL,
    nat_user VARCHAR(50) NOT NULL,

    nin_user VARCHAR(30) NOT NULL,
    email_user VARCHAR(100) NOT NULL,

    mdp_user TEXT NOT NULL,

    commentaire_demande TEXT,

    date_heure_demande TIMESTAMP NOT NULL DEFAULT NOW(),

    id_role BIGINT NOT NULL
        REFERENCES role(id_role),

    id_bureau BIGINT NOT NULL
        REFERENCES bureau_agence(id_bureau),

    traite_par BIGINT
        REFERENCES utilisateur(id_user),

    date_traitement TIMESTAMP
);

CREATE TABLE transactions (
    id_transac BIGSERIAL PRIMARY KEY,
    ref_transac VARCHAR(255) NOT NULL UNIQUE,
    type_transac VARCHAR(50) NOT NULL,
    statut_transac VARCHAR(50) NOT NULL,

    montant_transac NUMERIC(10,2) NOT NULL
        CHECK (montant_transac > 0),

    description_transac TEXT,
    date_heure_transac TIMESTAMP NOT NULL,

    id_demande_recharge BIGINT UNIQUE
        REFERENCES demande_rechargement(id_demande_recharge)
        ON DELETE RESTRICT,

    id_user BIGINT
        REFERENCES utilisateur(id_user)
        ON DELETE RESTRICT,

    id_portefeuille_source BIGINT NOT NULL
        REFERENCES portefeuille(id_prtfl)
        ON DELETE RESTRICT,

    id_portefeuille_dest BIGINT NOT NULL
        REFERENCES portefeuille(id_prtfl)
        ON DELETE RESTRICT,

    CHECK (id_portefeuille_source <> id_portefeuille_dest)
);

-- =========================
-- PACKAGES
-- =========================

CREATE TABLE package_voyage (
    id_pack BIGSERIAL PRIMARY KEY,
    mle_pack VARCHAR(255) NOT NULL UNIQUE,
    statut_pack VARCHAR(100) NOT NULL,
    nom_pack VARCHAR(255) NOT NULL,
    pays_pack VARCHAR(50) NOT NULL,
    destination_pack VARCHAR(50) NOT NULL,
    image_pack VARCHAR(255),
    description_pack TEXT,
    date_depart_pack DATE NOT NULL,
    date_retour_pack DATE NOT NULL,
    prix_base_pack NUMERIC(10,2) NOT NULL,
    stock_total_pack INT NOT NULL,
    stock_dispo_pack INT NOT NULL,
    date_heure_creation_pack TIMESTAMP NOT NULL,
    
    supp_economy_pack DECIMAL(10,2) DEFAULT 0,
    supp_business_pack DECIMAL(10,2) DEFAULT 0,
    supp_first_pack DECIMAL(10,2) DEFAULT 0,    
    supp_single_pack DECIMAL(10,2) DEFAULT 0,
    supp_double_pack DECIMAL(10,2) DEFAULT 0,
    supp_triple_pack DECIMAL(10,2) DEFAULT 0,
    supp_quadruple_pack DECIMAL(10,2) DEFAULT 0,
    supp_suite_pack DECIMAL(10,2) DEFAULT 0,
    supp_bed_only_pack DECIMAL(10,2) DEFAULT 0,
    supp_bed_breakfast_pack DECIMAL(10,2) DEFAULT 0,
    supp_half_board_pack DECIMAL(10,2) DEFAULT 0,
    supp_full_board_pack DECIMAL(10,2) DEFAULT 0,
    supp_all_inclusive_pack DECIMAL(10,2) DEFAULT 0,

    default_flight_class_pack VARCHAR(50) NOT NULL,
    default_room_type_pack VARCHAR(50) NOT NULL,
    default_board_type_pack VARCHAR(50) NOT NULL,

    id_user BIGINT NOT NULL
    REFERENCES utilisateur(id_user)
    ON DELETE RESTRICT,

    CHECK (stock_dispo_pack >= 0),
    CHECK (stock_dispo_pack <= stock_total_pack)
);

CREATE TABLE achat_package (
    id_achat_pack BIGSERIAL PRIMARY KEY,
    ref_achat_pack VARCHAR(255) NOT NULL UNIQUE,
    nb_voyageurs SMALLINT NOT NULL,
    classe_vol_achat_pack VARCHAR(50) NOT NULL,
    type_chambre_achat_pack VARCHAR(50) NOT NULL,
    pension_achat_pack VARCHAR(50) NOT NULL,
    prix_achat_pack NUMERIC(10,2) NOT NULL,
    remise_achat_pack NUMERIC(5,2) DEFAULT 0,
    total_achat_pack NUMERIC(10,2) NOT NULL,
    date_heure_achat_pack TIMESTAMP NOT NULL,
    statut_achat_pack VARCHAR(50) NOT NULL,

    id_transac BIGINT UNIQUE
        REFERENCES transactions(id_transac)
        ON DELETE RESTRICT,

    id_pack BIGINT NOT NULL
        REFERENCES package_voyage(id_pack)
        ON DELETE RESTRICT,

    id_user BIGINT NOT NULL
        REFERENCES utilisateur(id_user)
        ON DELETE RESTRICT
);

-- =========================
-- RELATIONS N-N
-- =========================

CREATE TABLE possede (
    id_vol BIGINT REFERENCES vol(id_vol) ON DELETE CASCADE,
    id_pack BIGINT REFERENCES package_voyage(id_pack) ON DELETE CASCADE,
    ordre SMALLINT NOT NULL,
    PRIMARY KEY (id_vol, id_pack)
);

CREATE TABLE heberge (
    id_hot BIGINT REFERENCES hotel(id_hot) ON DELETE CASCADE,
    id_pack BIGINT REFERENCES package_voyage(id_pack) ON DELETE CASCADE,
    PRIMARY KEY (id_hot, id_pack)
);

CREATE TABLE utilise (
    id_transp BIGINT REFERENCES transport(id_transp) ON DELETE CASCADE,
    id_pack BIGINT REFERENCES package_voyage(id_pack) ON DELETE CASCADE,
    PRIMARY KEY (id_transp, id_pack)
);

CREATE TABLE propose (
    id_exc BIGINT REFERENCES excursion(id_exc) ON DELETE CASCADE,
    id_pack BIGINT REFERENCES package_voyage(id_pack) ON DELETE CASCADE,
    PRIMARY KEY (id_exc, id_pack)
);

CREATE TABLE favorise (
    id_user BIGINT REFERENCES utilisateur(id_user) ON DELETE CASCADE,
    id_pack BIGINT REFERENCES package_voyage(id_pack) ON DELETE CASCADE,
    date_ajout_fav TIMESTAMP NOT NULL,
    PRIMARY KEY (id_user, id_pack)
);
