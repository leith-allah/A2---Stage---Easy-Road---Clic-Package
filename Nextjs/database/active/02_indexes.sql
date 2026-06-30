
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
