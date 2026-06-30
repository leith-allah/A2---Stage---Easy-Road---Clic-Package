
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
('BR001', 'Principal', '2009-04-01',
 'Algeria', 'Alger', 'Dar Diaf, Cheraga',
 'AGR001', '2026-06-28', 1);

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
('PRT001', 0, NOW(), 2), -- SUPER_ADMIN
('PRT002', 0, NOW(), 3), -- ADMIN
('PRT003', 500000, NOW(), 4), -- AGENCY
('PRT004', 300000, NOW(), 5); -- CLIENT

-- =========================
-- VOLS
-- =========================

INSERT INTO vol (
compagnie_vol,
lieu_depart_vol,
destination_vol,

date_aller_vol,
heure_depart_aller_vol,
heure_arrivee_aller_vol,

date_retour_vol,
heure_depart_retour_vol,
heure_arrivee_retour_vol,

num_vol
)

VALUES

(
'Air Algérie',
'Alger',
'Paris',

'2026-06-01',
'08:00',
'10:30',

'2026-06-10',
'14:00',
'16:30',

'AH100'
),

(
'Emirates',
'Alger',
'Dubai',

'2026-12-15',
'11:00',
'20:00',

'2026-12-22',
'09:00',
'18:00',

'EK220'
),

(
'Turkish Airlines',
'Alger',
'Istanbul',

'2026-11-10',
'07:30',
'11:45',

'2026-11-17',
'15:15',
'17:45',

'TK455'
),

(
'ITA Airways',
'Alger',
'Rome',

'2026-10-05',
'09:15',
'11:20',

'2026-10-12',
'16:00',
'18:15',

'AZ301'
),

(
'Vueling',
'Alger',
'Barcelone',

'2027-01-20',
'10:30',
'12:10',

'2027-01-27',
'13:30',
'15:10',

'VY712'
),

(
'Qatar Airways',
'Alger',
'Malé',

'2027-02-10',
'06:30',
'18:45',

'2027-02-18',
'20:15',
'09:10',

'QR805'
);

-- =========================
-- HOTELS
-- =========================

INSERT INTO hotel (
nom_hot,
nb_etoiles_hot,
pays_hot,
ville_hot,
adresse_hot
)

VALUES
(
'Hotel Paris Center',
4,
'France',
'Paris',
'Champs-Élysées'
),

(
'Burj View Resort',
5,
'Émirats Arabes Unis',
'Dubai',
'Downtown Dubai'
),

(
'Bosphorus Palace Hotel',
5,
'Turquie',
'Istanbul',
'Ortaköy'
),

(
'Roma Imperial Hotel',
4,
'Italie',
'Rome',
'Via Nazionale'
),

(
'Barcelona Beach Resort',
4,
'Espagne',
'Barcelone',
'Barceloneta'
),

(
'Paradise Lagoon Resort',
5,
'Maldives',
'Malé',
'North Malé Atoll'
);

-- =========================
-- TRANSPORTS
-- =========================

INSERT INTO transport (
trajet_transp,
societe_transp
)

VALUES
(
'Aéroport Charles de Gaulle → Hôtel',
'Paris Shuttle'
),

(
'Aéroport Dubai International → Hôtel',
'Emirates Transfer'
),

(
'Aéroport Istanbul → Hôtel',
'Istanbul Express'
),

(
'Aéroport Fiumicino → Hôtel',
'Roma Transfer'
),

(
'Aéroport El Prat → Hôtel',
'Barcelona City Shuttle'
),

(
'Aéroport de Malé → Resort en bateau rapide',
'Maldives Speed Boat'
);

-- =========================
-- EXCURSIONS
-- =========================

INSERT INTO excursion (
nom_exc,
lieu_exc,
description_exc
)

VALUES
(
'Tour Eiffel & Louvre',
'Paris',
'Visite guidée des monuments emblématiques de Paris.'
),

(
'Safari Désert Premium',
'Dubai',
'Safari 4x4 avec dîner traditionnel dans le désert.'
),

(
'Croisière sur le Bosphore',
'Istanbul',
'Croisière entre Europe et Asie avec dîner.'
),

(
'Visite du Colisée & Vatican',
'Rome',
'Découverte historique des plus grands monuments romains.'
),

(
'Sagrada Família & Park Güell',
'Barcelone',
'Visite des œuvres majeures de Gaudí.'
),

(
'Snorkeling & Dauphins',
'Maldives',
'Sortie en bateau avec snorkeling et observation des dauphins.'
);

-- =========================
-- PACKAGES
-- =========================

INSERT INTO package_voyage (
mle_pack, statut_pack, nom_pack, pays_pack, destination_pack,
image_pack, 
description_pack,
date_depart_pack, date_retour_pack, prix_base_pack, 
stock_total_pack, stock_dispo_pack, date_heure_creation_pack, 

supp_economy_pack, supp_business_pack, supp_first_pack,

supp_single_pack, supp_double_pack, 
supp_triple_pack, supp_quadruple_pack, supp_suite_pack,

supp_bed_only_pack, supp_bed_breakfast_pack,
supp_half_board_pack, supp_full_board_pack, supp_all_inclusive_pack,

id_user
)

VALUES 

('PK001','ACTIVE','Paris Découverte','France','Paris',
'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
'Découvrez la magie de Paris avec un séjour complet incluant vols aller-retour, hébergement idéalement situé, transferts, excursions culturelles et visite des monuments emblématiques tels que la Tour Eiffel, le Louvre et les Champs-Élysées.',
'2026-06-01','2026-06-10',120000,50,50,NOW(),
0,25000,60000,
30000,15000,10000,5000,50000,
0,5000,10000,15000,20000,
2),

('PK002','ACTIVE','Dubai Luxury','Émirats Arabes Unis','Dubai',
'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
'Séjour haut de gamme à Dubai comprenant hôtel 5 étoiles, vols internationaux, transferts privés et excursions exclusives.',
'2026-12-15','2026-12-22',180000,40,40,NOW(),
0,40000,90000,
35000,15000,10000,5000,70000,
0,10000,20000,30000,50000,
1),

('PK003','ACTIVE','Istanbul Premium','Turquie','Istanbul',
'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
'Découvrez Istanbul entre tradition et modernité avec hébergement premium, visites guidées et croisière sur le Bosphore.',
'2026-11-10','2026-11-17',140000,35,35,NOW(),
0,30000,70000,
25000,10000,5000,0,50000,
0,5000,10000,20000,40000,
1),

('PK004','ACTIVE','Rome Historique','Italie','Rome',
'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
'Partez à la découverte de Rome, la Ville Éternelle, avec un programme riche comprenant visites historiques, découverte du Colisée, du Vatican, des places mythiques et hébergement confortable au cœur de la capitale italienne.',
'2026-10-05','2026-10-12',130000,30,30,NOW(),
0,25000,65000,
20000,10000,5000,0,45000,
0,5000,10000,15000,30000,
1),

('PK005','ACTIVE','Barcelone Évasion','Espagne','Barcelone',
'https://images.unsplash.com/photo-1583422409516-2895a77efded',
'Profitez du soleil catalan avec un séjour complet à Barcelone incluant visites culturelles et activités balnéaires.',
'2027-01-20','2027-01-27',125000,45,45,NOW(),
0,25000,60000,
20000,10000,5000,0,40000,
0,5000,10000,15000,25000,
1),

('PK006','ACTIVE','Maldives Paradise','Maldives','Malé',
'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
'Expérience exceptionnelle dans les Maldives avec bungalow sur pilotis, pension complète et activités nautiques.',
'2027-02-10','2027-02-18',320000,20,20,NOW(),
0,60000,150000,
50000,20000,15000,10000,120000,
0,15000,30000,50000,80000,
1);

-- =========================
-- RELATIONS N-N
-- =========================

INSERT INTO possede VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6);

INSERT INTO heberge VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6);

INSERT INTO utilise VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6);

INSERT INTO propose VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6);

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
-- DEMANDE DE CRÉATION DE COMPTE
-- =========================

INSERT INTO demande_creation_compte (

    statut_demande_creation,

    nom_user,
    prenom_user,

    ddn_user,
    nat_user,

    nin_user,
    email_user,

    mdp_user,

    commentaire_demande,

    date_heure_demande,

    id_role,

    id_bureau

)

VALUES (

    'EN_ATTENTE',

    'Dupont',
    'Jean',

    '1998-04-15',
    'France',

    '123456789012345678',

    'jean.dupont@email.com',

    '$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',

    'Je souhaite créer un compte Client.',

    NOW(),

    5,      -- CLIENT

    1       -- Bureau principal

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
