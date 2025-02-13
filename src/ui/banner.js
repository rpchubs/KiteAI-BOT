import chalk from "chalk";

export default function displayBanner() {
  console.log(
    chalk.cyan(`

		██████╗ ██████╗  ██████╗    ██╗  ██╗██╗   ██╗██████╗ ███████╗
		██╔══██╗██╔══██╗██╔════╝    ██║  ██║██║   ██║██╔══██╗██╔════╝
		██████╔╝██████╔╝██║         ███████║██║   ██║██████╔╝███████╗
		██╔══██╗██╔═══╝ ██║         ██╔══██║██║   ██║██╔══██╗╚════██║
		██║  ██║██║     ╚██████╗    ██║  ██║╚██████╔╝██████╔╝███████║
		╚═╝  ╚═╝╚═╝      ╚═════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                             

                   ${chalk.yellow("KITE AI - REGISTER 📝")}                
     📢  ${chalk.blue("Telegram Channel: https://t.me/RPC_Hubs")}`)
  );

  console.log(
    chalk.yellow("\n════════════════════════════════════════════════════════")
  );
  console.log(chalk.white(`Started at: ${new Date().toLocaleString()}`));
  console.log(
    chalk.yellow("════════════════════════════════════════════════════════\n")
  );
}
