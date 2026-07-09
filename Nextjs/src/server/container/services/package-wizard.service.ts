
import { PackageWizardService }

from "@/server/services/package-wizard.service";

import {

  packageRepository,

}

from "../repositories/package.repository";

export const packageWizardService =

new PackageWizardService(

    packageRepository,

);
