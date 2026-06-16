
-- =========================
-- ROLES
-- =========================

INSERT INTO role (id_role, nom_role)
VALUES
(1, 'OWNER'),
(2, 'SUPER_ADMIN'),
(3, 'ADMIN'),
(4, 'AGENCY'),
(5, 'CLIENT');

-- =========================
-- AGENCE + BUREAU
-- =========================

INSERT INTO agence (mle_agence, nom_agence, dc_agence, sj_agence)
VALUES 
('AG001', 'EasyRoad Alger', '2025-01-01', 'SARL');

INSERT INTO bureau_agence (
    mle_bureau, type_bureau, dc_bureau,
    pays_bureau, ville_bureau, adresse_bureau,
    num_agr_bureau, dcc_bureau, id_agence
)
VALUES 
('BR001', 'Principal', '2025-01-01',
 'Algeria', 'Alger', 'Centre-ville Alger',
 'AGR001', '2025-01-01', 1);

-- =========================
-- UTILISATEURS
-- =========================

INSERT INTO utilisateur (
    mle_user, nin_user, nom_user, prenom_user,
    ddn_user, nat_user, statut_user, email_pro_user,
    mdp_user, dcc_user, id_role, id_bureau
)
VALUES

-- OWNER (moi)
(
'U001', '111111111', 'Amokrane', 'Owner',
'2000-01-01', 'DZ', 'ACTIVE', 'owner@easyroad.com',
'$2b$12$CLexYndLIfJaLuivlUeqAON8CPAu94w/6FPZJv7q2HPYy8GMUfCH6',
'2025-01-01', 1, 1
),

-- SUPER ADMIN
(
'U002', '222222222', 'Super', 'Admin',
'1995-01-01', 'DZ', 'ACTIVE', 'superadmin@easyroad.com',
'$2b$12$9SYKEIG9VJH0efsPHgnvwuxTvyMQJY4CMCvYVHOX1tRtRMLxPrxqG',
'2025-01-01', 2, 1
),

-- ADMIN
(
'U003', '333333333', 'System', 'Admin',
'1995-01-01', 'DZ', 'ACTIVE', 'admin@easyroad.com',
'$2b$12$dRA.5xF85Net.fh4bOtFU.565XOVDsntOCBia6ThS6BWphMz3iR/G',
'2025-01-01', 3, 1
),

-- AGENCY
(
'U004', '444444444', 'Agence', 'Partner',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@easyroad.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 1
),

-- CLIENT
(
'U005', '555555555', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client@easyroad.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 1
);

-- =========================
-- PORTEFEUILLES
-- =========================

INSERT INTO portefeuille (
    num_prtfl,
    solde_total_prtfl,
    derniere_maj_prtfl,
    id_user
)
VALUES
('PRT000', 1000000, NOW(), 1), -- OWNER
('PRT001', 50000, NOW(), 5), -- CLIENT
('PRT002', 0, NOW(), 4);     -- AGENCY

-- =========================
-- VOLS
-- =========================

INSERT INTO vol (
compagnie_vol, lieu_depart_vol, destination_vol,
date_aller_vol, heure_depart_aller_vol, heure_arrivee_aller_vol,
num_vol
)
VALUES 
('Air Algérie','Alger','Paris','2026-06-01','08:00','10:30','AH100'),
('Air France','Paris','Alger','2026-06-10','14:00','16:30','AF200');

-- =========================
-- HOTELS
-- =========================

INSERT INTO hotel (
nom_hot, nb_etoiles_hot, pays_hot, ville_hot, adresse_hot
)
VALUES 
('Hotel Paris Center', 4, 'France', 'Paris', 'Champs-Élysées'),
('Alger Beach Hotel', 5, 'Algeria', 'Alger', 'Front de mer');

-- =========================
-- TRANSPORTS
-- =========================

INSERT INTO transport (trajet_transp, societe_transp)
VALUES 
('Aéroport - Hôtel', 'CityBus'),
('Hôtel - Centre Ville', 'Taxi Partner');

-- =========================
-- EXCURSIONS
-- =========================

INSERT INTO excursion (nom_exc, lieu_exc, description_exc)
VALUES 
('Tour Eiffel Visit', 'Paris', 'Visite guidée de la Tour Eiffel'),
('Casbah Tour', 'Alger', 'Découverte historique de la Casbah');

-- =========================
-- PACKAGES
-- =========================

INSERT INTO package_voyage (
mle_pack, statut_pack, nom_pack,
pays_pack, destination_pack,
date_depart_pack, date_retour_pack,
prix_base_pack, stock_total_pack, stock_dispo_pack,
date_heure_creation_pack
)
VALUES 
('PK001','ACTIVE','Paris Découverte','France','Paris',
'2026-06-01','2026-06-10',120000,50,50,NOW());

-- =========================
-- RELATIONS N-N
-- =========================

INSERT INTO possede VALUES (1,1), (2,1);

INSERT INTO heberge VALUES (1,1), (2,1);

INSERT INTO utilise VALUES (1,1), (2,1);

INSERT INTO propose VALUES (1,1), (2,1);

-- =========================
-- FAVORIS
-- =========================

INSERT INTO favorise (id_user, id_pack, date_ajout_fav)
VALUES 
(5,1,NOW());

-- =========================
-- DEMANDES DE RECHARGEMENT
-- =========================

INSERT INTO demande_rechargement (
    statut_demande_recharge,
    montant_demande_recharge,
    date_heure_demande_recharge,
    comment_demande_recharge,
    id_user
)
VALUES
(
    'VALIDEE',
    20000,
    NOW(),
    'Recharge initiale',
    5
);

-- =========================
-- TRANSACTIONS
-- =========================

INSERT INTO transactions (
    ref_transac,
    type_transac,
    statut_transac,
    montant_transac,
    description_transac,
    date_heure_transac,
    id_demande_recharge,
    id_user,
    id_portefeuille_source,
    id_portefeuille_dest
)
VALUES
(
    'TRX001',
    'RECHARGE',
    'SUCCESS',
    20000,
    'Recharge portefeuille',
    NOW(),
    1,
    5,
    2,
    1
);

-- =========================
-- ACHATS PACKAGE
-- =========================

INSERT INTO achat_package (
    ref_achat_pack,
    nb_voyageurs,
    classe_vol_achat_pack,
    type_chambre_achat_pack,
    pension_achat_pack,
    prix_achat_pack,
    remise_achat_pack,
    total_achat_pack,
    date_heure_achat_pack,
    statut_achat_pack,
    id_transac,
    id_pack,
    id_user
)
VALUES
(
    'ACH001',
    2,
    'ECONOMY',
    'DOUBLE',
    'ALL_IN',
    120000,
    10,
    108000,
    NOW(),
    'CONFIRMED',
    1,
    1,
    5
);
