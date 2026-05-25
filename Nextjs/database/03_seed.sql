
-- =========================
-- ROLES
-- =========================

INSERT INTO role (nom_role)
VALUES 
('ADMIN'),
('CLIENT'),
('AGENT');

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
    ddn_user, nat_user, statut_user,
    email_pro_user, mdp_user, dcc_user,
    id_role, id_bureau
)
VALUES 
('U001','111111111','Admin','Root','1990-01-01','DZ','ACTIVE','admin@easyroad.com','pass','2025-01-01',1,1),
('U002','222222222','Client','Ali','1998-05-10','DZ','ACTIVE','ali@easyroad.com','pass','2025-01-01',2,1),
('U003','333333333','Client','Sara','2000-09-15','DZ','ACTIVE','sara@easyroad.com','pass','2025-01-01',2,1),
('U004','444444444','Agent','Yacine','1995-03-20','DZ','ACTIVE','agent@easyroad.com','pass','2025-01-01',3,1);

-- =========================
-- PORTEFEUILLES
-- =========================

INSERT INTO portefeuille (num_prtfl, solde_total_prtfl, derniere_maj_prtfl, id_user)
VALUES 
('PRT001', 50000, NOW(), 2),
('PRT002', 75000, NOW(), 3),
('PRT003', 0, NOW(), 4);

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
(2,1,NOW()),
(3,1,NOW());
