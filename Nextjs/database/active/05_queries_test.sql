
SELECT * FROM role;

SELECT * FROM utilisateur;

SELECT * FROM portefeuille;

SELECT * FROM package_voyage;

SELECT * FROM transactions;

SELECT * FROM achat_package;



SELECT
p.id_pack,
p.nom_pack,
u.id_user,
u.nom_user,
r.nom_role
FROM package_voyage p
JOIN utilisateur u ON p.id_user = u.id_user
JOIN role r ON u.id_role = r.id_role;
