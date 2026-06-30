
import crypto from "crypto";

import { prisma } from "@/server/db/prisma";

import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

import { PACKAGE_STATUS }
from "@/server/constants/package-status";

export const packageAdminService = {

async create(data:any){

const user =
await getCurrentUser();

if(!user){

throw new Error(
"Utilisateur non connecté"
);

}

const result =
await prisma.$transaction(

async(tx)=>{

const packageCreated =
await tx.package_voyage.create({

data:{

mle_pack:
crypto.randomUUID(),

statut_pack:
PACKAGE_STATUS.ACTIVE,

nom_pack:
data.nom_pack,

pays_pack:
data.pays,

destination_pack:
data.ville,

description_pack:
data.description,

image_pack:
data.image_url || null,

date_depart_pack:
new Date(data.date_depart),

date_retour_pack:
new Date(data.date_retour),

prix_base_pack:
Number(data.prix_base),

stock_total_pack:
Number(data.places_disponibles),

stock_dispo_pack:
Number(data.places_disponibles),

date_heure_creation_pack:
new Date(),

id_user:
BigInt(user.sub),

},

});

const vol =
await tx.vol.create({

data:{

statut_vol:"ACTIF",

compagnie_vol:
data.compagnie_aerienne,

lieu_depart_vol:
data.aeroport_depart,

destination_vol:
data.aeroport_arrivee,

date_aller_vol:
new Date(data.date_depart),

heure_depart_aller_vol:
new Date(`1970-01-01T08:00:00`),

heure_arrivee_aller_vol:
new Date(`1970-01-01T10:00:00`),

date_retour_vol:
new Date(data.date_retour),

heure_depart_retour_vol:
new Date(`1970-01-01T16:00:00`),

heure_arrivee_retour_vol:
new Date(`1970-01-01T18:00:00`),

num_vol:
data.numero_vol,

},

});

await tx.possede.create({

data:{

id_pack:
packageCreated.id_pack,

id_vol:
vol.id_vol,

},

});

const hotel =
await tx.hotel.create({

data:{

nom_hot:
data.hotel_nom,

nb_etoiles_hot:
Number(data.hotel_etoiles),

pays_hot:
data.pays,

ville_hot:
data.ville,

adresse_hot:
`${data.ville}`,

},

});

await tx.heberge.create({

data:{

id_pack:
packageCreated.id_pack,

id_hot:
hotel.id_hot,

},

});

return packageCreated;

}

);

return result;

},

};
