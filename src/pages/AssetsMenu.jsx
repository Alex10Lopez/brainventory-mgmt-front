import { assetsMenu } from "../data/text/menuText";
import InventoryMenu from "../components/InventoryMenu";

function AssetsMenu() {
  return (
    <>
      <InventoryMenu
        title="Menú de Infraestructura"
        inventoryCards={assetsMenu}
      />
    </>
  );
}

export default AssetsMenu;
