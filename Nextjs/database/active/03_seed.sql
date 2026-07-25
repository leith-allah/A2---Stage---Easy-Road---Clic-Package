
-- =========================
-- TABLES MONDIALES
-- =========================

-- =========================
-- PAYS
-- =========================

INSERT INTO pays (
    id_pays,
    code_iso2_pays,
    code_iso3_pays,
    nom_pays,
    indicatif_tel_pays
)
VALUES
(1,'DZ','DZA','Algérie','+213'),
(2,'FR','FRA','France','+33'),
(3,'AE','ARE','Émirats Arabes Unis','+971'),
(4,'TR','TUR','Turquie','+90'),
(5,'IT','ITA','Italie','+39'),
(6,'ES','ESP','Espagne','+34'),
(7,'MV','MDV','Maldives','+960');

-- =========================
-- VILLES
-- =========================

INSERT INTO ville (
    id_ville,
    nom_ville,
    latitude_ville,
    longitude_ville,
    fuseau_horaire_ville,
    id_pays
)
VALUES
(1,'Alger',36.7538,3.0588,'Africa/Algiers',1),
(2,'Paris',48.8566,2.3522,'Europe/Paris',2),
(3,'Dubai',25.2048,55.2708,'Asia/Dubai',3),
(4,'Istanbul',41.0082,28.9784,'Europe/Istanbul',4),
(5,'Rome',41.9028,12.4964,'Europe/Rome',5),
(6,'Barcelone',41.3874,2.1686,'Europe/Madrid',6),
(7,'Malé',4.1755,73.5093,'Indian/Maldives',7);

-- =========================
-- AEROPORTS
-- =========================

INSERT INTO aeroport (
    id_aeroport,
    code_iata_aeroport,
    code_icao_aeroport,
    nom_aeroport,
    latitude_aeroport,
    longitude_aeroport,
    id_ville
)
VALUES

(1,'ALG','DAAG','Aéroport Houari Boumediene',
36.6910,
3.2154,
1),

(2,'CDG','LFPG','Aéroport Charles de Gaulle',
49.0097,
2.5479,
2),

(3,'DXB','OMDB','Dubai International Airport',
25.2532,
55.3657,
3),

(4,'IST','LTFM','Istanbul Airport',
41.2753,
28.7519,
4),

(5,'FCO','LIRF','Aéroport Léonard-de-Vinci',
41.8003,
12.2389,
5),

(6,'BCN','LEBL','Aéroport Josep Tarradellas',
41.2974,
2.0833,
6),

(7,'MLE','VRMM','Velana International Airport',
4.1918,
73.5291,
7);

-- =========================
-- COMPAGNIES AERIENNES
-- =========================

INSERT INTO compagnie_aerienne (
    id_compagnie,
    code_iata_compagnie,
    code_icao_compagnie,
    nom_compagnie,
    site_compagnie
)
VALUES
(1,'AH','DAH','Air Algérie','https://airalgerie.dz'),
(2,'EK','UAE','Emirates','https://emirates.com'),
(3,'TK','THY','Turkish Airlines','https://turkishairlines.com'),
(4,'AZ','ITY','ITA Airways','https://ita-airways.com'),
(5,'VY','VLG','Vueling','https://vueling.com'),
(6,'QR','QTR','Qatar Airways','https://qatarairways.com');


-- =========================
-- TABLES METIER
-- =========================

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
('AG001', 'EasyRoad Voyages', '2025-01-01', 'SARL'),
('AG002', 'Gouraya Tours', '2011-01-01', 'SARL'),
('AG003', 'Cheval Blanc Voyages', '2018-01-01', 'EURL'),
('AG004', 'Maestro Team Voyages', '2017-01-01', 'SARL'),
('AG005', 'Le Relais Voyages', '2012-01-01', 'SARL');

INSERT INTO bureau_agence (
    mle_bureau, type_bureau, dc_bureau,
    pays_bureau, ville_bureau, adresse_bureau,
    num_agr_bureau, dcc_bureau, id_agence
)

VALUES 
('BR001', 'HEAD_OFFICE', '2009-04-01',
 'Algérie', 'Alger', 'Dar Diaf, Cheraga',
 'AGR001', '2026-06-28', 1),

('BR002', 'HEAD_OFFICE', '2011-01-01',
 'Algérie', 'Béjaïa', 'Gouraya, Béjaia',
 'AGR002', '2026-07-01', 2),

('BR003', 'HEAD_OFFICE', '2018-01-01',
 'Algérie', 'Alger', 'Bir Mourad Raïs, Alger',
 'AGR003', '2026-07-01', 3),

('BR004', 'HEAD_OFFICE', '2017-01-01',
 'Algérie', 'Alger', 'Birkhadem, Alger',
 'AGR004', '2026-07-01', 4),

('BR005', 'HEAD_OFFICE', '2012-01-01',
 'Algérie', 'Boumerdès', 'RN.24 Aliliguia, Boumerdès',
 'AGR005', '2026-07-01', 5);

-- =========================
-- UTILISATEURS
-- =========================

INSERT INTO utilisateur (
    mle_user, nin_user, nom_user, prenom_user,
    ddn_user, nat_user, statut_user, email_pro_user,
    mdp_user, 
    dcc_user, id_role, id_bureau
)
VALUES

-- OWNER (moi)
(
'BOSS000', '000000000', 'Amokrane', 'Owner',
'2000-01-01', 'DZ', 'ACTIVE', 'owner@easyroad.com',
'$2b$12$CLexYndLIfJaLuivlUeqAON8CPAu94w/6FPZJv7q2HPYy8GMUfCH6',
'2025-01-01', 1, 1
),

-- SUPER ADMIN
(
'SAD001', '010000000', 'Super', 'Admin',
'1995-01-01', 'DZ', 'ACTIVE', 'superadmin@easyroad.com',
'$2b$12$9SYKEIG9VJH0efsPHgnvwuxTvyMQJY4CMCvYVHOX1tRtRMLxPrxqG',
'2025-01-01', 2, 1
),

-- ADMIN
(
'AD001', '020000000', 'System', 'Admin',
'1995-01-01', 'DZ', 'ACTIVE', 'admin1@easyroad.com',
'$2b$12$dRA.5xF85Net.fh4bOtFU.565XOVDsntOCBia6ThS6BWphMz3iR/G',
'2025-01-01', 3, 1
),
(
'AD002', '020000001', 'System', 'Admin',
'1995-01-01', 'DZ', 'ACTIVE', 'admin2@easyroad.com',
'$2b$12$dRA.5xF85Net.fh4bOtFU.565XOVDsntOCBia6ThS6BWphMz3iR/G',
'2025-01-01', 3, 1
),

-- AGENCY
(
'AG000', '030000000', 'Agence', 'Principal',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@easyroad.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 1
),

-- AGENCY - GOURAYA TOURS
(
'AG001', '130000000', 'AgencePartenaire', 'GourayaTours',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@gourayatours.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 2
),

-- AGENCY - CHEVAL BLANC VOYAGES
(
'AG002', '230000000', 'AgencePartenaire', 'ChevalBlancVoyages',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@chevalblanc.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 3
),

-- AGENCY - MAESTRO TEAM VOYAGES
(
'AG003', '330000000', 'AgencePartenaire', 'MaestroTeamVoyages',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@maestroteam.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 4
),

-- AGENCY - LE RELAIS VOYAGES
(
'AG004', '430000000', 'AgencePartenaire', 'LeRelaisVoyages',
'1995-01-01', 'DZ', 'ACTIVE', 'agency@lerelais.com',
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 4, 5
),

-- CLIENT - EASY ROAD VOYAGES 
(
'U000', '040000000', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client@easyroad.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 1
),

-- CLIENT - GOURAYA TOURS 
(
'U100', '140000000', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client1@gourayatours.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U101', '140000001', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client2@gourayatours.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U102', '140000002', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client3@gourayatours.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),

-- CLIENT - CHEVAL BLANC VOYAGES 
(
'U200', '240000000', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client1@chevalblanc.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 3
),
(
'U201', '240000001', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client2@chevalblanc.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 3
),
(
'U202', '240000002', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client3@chevalblanc.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 3
),

-- CLIENT - MAESTRO TEAM VOYAGES 
(
'U300', '340000000', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client1@maestroteam.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U301', '340000001', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client2@maestroteam.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U302', '340000002', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client3@maestroteam.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),

-- CLIENT - LE RELAIS VOYAGES 
(
'U400', '440000000', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client1@lerelais.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U401', '440000001', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client2@lerelais.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
),
(
'U402', '440000002', 'Client', 'Demo',
'1998-05-10', 'DZ', 'ACTIVE', 'client3@lerelais.com',    
'$2b$12$CRorRAhIwZYeTjALjahCQOIc26duMRtq9MCkhpHLBSqOuYkfPTjKa',
'2025-01-01', 5, 2
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
('PRT0000', 10000000, NOW(), 1), -- OWNER
('PRT0101', 0, NOW(), 2), -- SUPER_ADMIN
('PRT0201', 0, NOW(), 3), -- ADMIN 1
('PRT0202', 0, NOW(), 4), -- ADMIN 2
('PRT0300', 5000000, NOW(), 5), -- AGENCY
('PRT1300', 5000000, NOW(), 6), -- AGENCY - GOURAYA TOURS
('PRT2300', 5000000, NOW(), 7), -- AGENCY - CHEVAL BLANC VOYAGES
('PRT3300', 5000000, NOW(), 8), -- AGENCY - MAESTRO TEAM VOYAGES
('PRT4300', 5000000, NOW(), 9), -- AGENCY - LE RELAIS VOYAGES
('PRT0401', 500000, NOW(), 10), -- CLIENT
('PRT1401', 200000, NOW(), 11), -- CLIENT - GOURAYA TOURS
('PRT1402', 150000, NOW(), 12), -- CLIENT - GOURAYA TOURS
('PRT1403', 100000, NOW(), 13), -- CLIENT - GOURAYA TOURS
('PRT2401', 550000, NOW(), 14), -- CLIENT - CHEVAL BLANC VOYAGES
('PRT2402', 25000, NOW(), 15), -- CLIENT - CHEVAL BLANC VOYAGES
('PRT2403', 10000, NOW(), 16), -- CLIENT - CHEVAL BLANC VOYAGES
('PRT3401', 5000, NOW(), 17), -- CLIENT - MAESTRO TEAM VOYAGES
('PRT3402', 80000, NOW(), 18), -- CLIENT - MAESTRO TEAM VOYAGES
('PRT3403', 260000, NOW(), 19), -- CLIENT - MAESTRO TEAM VOYAGES
('PRT4401', 220000, NOW(), 20), -- CLIENT - LE RELAIS VOYAGES
('PRT4402', 20000, NOW(), 21), -- CLIENT - LE RELAIS VOYAGES
('PRT4403', 40000, NOW(), 22); -- CLIENT - LE RELAIS VOYAGES

-- =========================
-- VOLS
-- =========================

INSERT INTO vol (
    
    statut_vol,

    num_vol,

    depart_vol,
    arrivee_vol,

    id_aeroport_depart,
    id_aeroport_arrivee,

    id_compagnie

)

VALUES

-- PARIS --

(
'ACTIVE',
'AH100',

'2026-06-01 08:00:00',
'2026-06-01 10:30:00',

1,
2,

1
),

(
'ACTIVE',
'AH101',

'2026-06-10 14:00:00',
'2026-06-10 16:30:00',

2,
1,

1
),

-- DUBAI --

(
'ACTIVE',
'EK220',

'2026-12-15 11:00:00',
'2026-12-15 20:00:00',

1,
3,

2
),

(
'ACTIVE',
'EK221',

'2026-12-22 09:00:00',
'2026-12-22 18:00:00',

3,
1,

2
),

-- ISTANBUL -- 

(
'ACTIVE',
'TK455',

'2026-11-10 07:30:00',
'2026-11-10 11:45:00',

1,
4,

3
),

(
'ACTIVE',
'TK456',

'2026-11-17 15:15:00',
'2026-11-17 17:45:00',

4,
1,

3
),

-- ROME --

(
'ACTIVE',
'AZ301',

'2026-10-05 09:15:00',
'2026-10-05 11:20:00',

1,
5,

4
),

(
'ACTIVE',
'AZ302',

'2026-10-12 16:00:00',
'2026-10-12 18:15:00',

5,
1,

4
),

-- BARCELONE --

(
'ACTIVE',
'VY712',

'2027-01-20 10:30:00',
'2027-01-20 12:10:00',

1,
6,

5
),

(
'ACTIVE',
'VY713',

'2027-01-27 13:30:00',
'2027-01-27 15:10:00',

6,
1,

5
),

-- MALDIVES --

(
'ACTIVE',
'QR805',

'2027-02-10 06:30:00',
'2027-02-10 18:45:00',

1,
7,

6
),

(
'ACTIVE',
'QR806',

'2027-02-18 20:15:00',
'2027-02-19 09:10:00',

7,
1,

6
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

default_flight_class_pack,
default_room_type_pack,
default_board_type_pack,

id_user
)

VALUES 

('PK001','ACTIVE','Paris Découverte','France','Paris',
'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
'Découvrez la magie de Paris avec un séjour complet incluant vols aller-retour, hébergement idéalement situé, transferts, excursions culturelles et visite des monuments emblématiques tels que la Tour Eiffel, le Louvre et les Champs-Élysées.',
'2026-06-01','2026-06-10',120000,50,50,NOW(),
0,25000,60000,
20000,0,10000,5000,50000,
0,5000,10000,15000,20000,
'economy',
'double',
'bed_only',
3),

('PK002','ACTIVE','Dubai Luxury','Émirats Arabes Unis','Dubai',
'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
'Séjour haut de gamme à Dubai comprenant hôtel 5 étoiles, vols internationaux, transferts privés et excursions exclusives.',
'2026-12-15','2026-12-22',180000,40,40,NOW(),
0,40000,90000,
0,15000,0,0,70000,
0,10000,20000,30000,50000,
'economy',
'quadruple',
'bed_only',
3),

('PK003','ACTIVE','Istanbul Premium','Turquie','Istanbul',
'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
'Découvrez Istanbul entre tradition et modernité avec hébergement premium, visites guidées et croisière sur le Bosphore.',
'2026-11-10','2026-11-17',140000,35,35,NOW(),
0,30000,70000,
0,10000,5000,0,50000,
0,5000,10000,20000,40000,
'economy',
'quadruple',
'bed_only',
3),

('PK004','ACTIVE','Rome Historique','Italie','Rome',
'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
'Partez à la découverte de Rome, la Ville Éternelle, avec un programme riche comprenant visites historiques, découverte du Colisée, du Vatican, des places mythiques et hébergement confortable au cœur de la capitale italienne.',
'2026-10-05','2026-10-12',130000,30,30,NOW(),
0,25000,65000,
40000,30000,0,0,45000,
0,5000,10000,15000,30000,
'economy',
'quadruple',
'bed_only',
3),

('PK005','ACTIVE','Barcelone Évasion','Espagne','Barcelone',
'https://images.unsplash.com/photo-1583422409516-2895a77efded',
'Profitez du soleil catalan avec un séjour complet à Barcelone incluant visites culturelles et activités balnéaires.',
'2027-01-20','2027-01-27',125000,45,45,NOW(),
0,25000,60000,
30000,0,0,0,40000,
0,5000,10000,15000,25000,
'economy',
'quadruple',
'bed_only',
3),

('PK006','ACTIVE','Maldives Paradise','Maldives','Malé',
'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
'Expérience exceptionnelle dans les Maldives avec bungalow sur pilotis, pension complète et activités nautiques.',
'2027-02-10','2027-02-18',320000,20,20,NOW(),
0,60000,150000,
30000,0,20000,25000,120000,
0,0,0,0,80000,
'economy',
'double',
'full_board',
3);

-- =========================
-- RELATIONS N-N
-- =========================

INSERT INTO possede VALUES

-- Paris
(1,1,1),
(2,1,2),

-- Dubai
(3,2,1),
(4,2,2),

-- Istanbul
(5,3,1),
(6,3,2),

-- Rome
(7,4,1),
(8,4,2),

-- Barcelone
(9,5,1),
(10,5,2),

-- Maldives
(11,6,1),
(12,6,2);

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
(10,1,NOW());

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
    'APPROVED',
    200000,
    NOW(),
    'Recharge initiale',
    10
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

    'PENDING',

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
    'TOP_UP',
    'SUCCESS',
    200000,
    'Recharge portefeuille',
    NOW(),
    1,
    10,
    1,
    10
),
(
    'TRX002',
    'PACKAGE_PURCHASE',
    'SUCCESS',
    200000,
    'Achat Package Paris Découverte',
    NOW(),
    NULL,
    10,
    10,
    3
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
    'economy',
    'double',
    'all_inclusive',
    120000,
    10,
    108000,
    NOW(),
    'CONFIRMED',
    2,
    1,
    10
);
