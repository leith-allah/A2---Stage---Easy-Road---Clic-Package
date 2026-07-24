
-- =========================
-- INDEXES
-- =========================

CREATE INDEX idx_user_bureau ON utilisateur(id_bureau);
CREATE INDEX idx_user_role ON utilisateur(id_role);

CREATE INDEX idx_trans_user ON transactions(id_user);
CREATE INDEX idx_trans_port_src ON transactions(id_portefeuille_source);
CREATE INDEX idx_trans_port_dest ON transactions(id_portefeuille_dest);

CREATE INDEX idx_achat_user ON achat_package(id_user);
CREATE INDEX idx_achat_pack ON achat_package(id_pack);

CREATE INDEX idx_package_destination ON package_voyage(destination_pack);
CREATE INDEX idx_package_statut ON package_voyage(statut_pack);

CREATE INDEX idx_package_owner ON package_voyage(id_user);

CREATE INDEX idx_demande_creation_statut
ON demande_creation_compte(statut_demande_creation);

CREATE INDEX idx_demande_creation_role
ON demande_creation_compte(id_role);

CREATE INDEX idx_demande_creation_bureau
ON demande_creation_compte(id_bureau);

-- =========================
-- GEOGRAPHIE
-- =========================

CREATE INDEX idx_ville_pays
ON ville(id_pays);

CREATE INDEX idx_aeroport_ville
ON aeroport(id_ville);

CREATE INDEX idx_vol_depart
ON vol(id_aeroport_depart);

CREATE INDEX idx_vol_arrivee
ON vol(id_aeroport_arrivee);

CREATE INDEX idx_vol_compagnie
ON vol(id_compagnie);

CREATE INDEX idx_vol_datetime
ON vol(depart_vol);
