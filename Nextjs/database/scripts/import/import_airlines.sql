
\COPY compagnie_aerienne(nom_compagnie, code_iata)
FROM 'database/reference_data/airlines/airlines.csv'
DELIMITER ','
CSV HEADER;
