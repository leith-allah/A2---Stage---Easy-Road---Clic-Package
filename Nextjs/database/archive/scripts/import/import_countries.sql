
\COPY pays(nom_pays, code_iso)
FROM 'database/reference_data/countries/countries_clean.csv'
DELIMITER ','
CSV HEADER;
