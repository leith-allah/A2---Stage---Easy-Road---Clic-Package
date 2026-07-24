
import { packageQueryService }
from "./packages/package-query.service";

import { packageCommandService }
from "./packages/package-command.service";

import { packageStatusService }
from "./packages/package-status.service";

import { packageStockService }
from "./packages/package-stock.service";


export const packageService = {

    ...packageQueryService,

    ...packageCommandService,

    ...packageStatusService,

    ...packageStockService,

};
