
DELETE FROM ville a
USING ville b
WHERE a.id_ville > b.id_ville
AND a.nom_ville = b.nom_ville;
