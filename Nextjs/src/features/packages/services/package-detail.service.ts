
import { api }
from "@/lib/api";

export async function
fetchPackageById(
  id: number
) {

  return api(
    `/packages/${id}`
  );

}
