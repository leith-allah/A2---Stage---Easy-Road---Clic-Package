
-- =========================
-- CLIC PACKAGE DATABASE
-- SCHEMA
-- =========================

-- =========================
-- TABLES DE BASE
-- =========================

CREATE TABLE vol (
    id_vol BIGSERIAL PRIMARY KEY,
    compagnie_vol VARCHAR(50) NOT NULL,
    lieu_depart_vol VARCHAR(50) NOT NULL,
    destination_vol VARCHAR(50) NOT NULL,
    date_aller_vol DATE NOT NULL,
    heure_depart_aller_vol TIME NOT NULL,
    heure_arrivee_aller_vol TIME NOT NULL,
    date_retour_vol DATE,
    heure_depart_retour_vol TIME,
    heure_arrivee_retour_vol TIME,
    num_vol VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE transport (
    id_transp BIGSERIAL PRIMARY KEY,
    trajet_transp VARCHAR(50) NOT NULL,
    societe_transp VARCHAR(50)
);

CREATE TABLE hotel (
    id_hot BIGSERIAL PRIMARY KEY,
    nom_hot VARCHAR(100) NOT NULL,
    nb_etoiles_hot SMALLINT NOT NULL CHECK (nb_etoiles_hot BETWEEN 1 AND 5),
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
