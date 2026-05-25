
\COPY ville(nom_ville, nom_pays)
FROM 'database/reference_data/cities/cities_clean.csv'
DELIMITER ','
CSV HEADER;
