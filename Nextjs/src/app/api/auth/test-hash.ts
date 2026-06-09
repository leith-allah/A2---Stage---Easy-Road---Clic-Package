
import bcrypt from "bcryptjs";

async function main() {

  console.log(
    await bcrypt.hash(
      "Admin123!",
      12
    )
  );

}

main();
