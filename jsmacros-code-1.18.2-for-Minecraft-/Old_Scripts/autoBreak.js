const p = Player.getPlayer();
const inv = Player.openInventory();
const tool = "minecraft:iron_pickaxe";
const food = "minecraft:bread";
function breakBlock()
{
    getItemInHotbar(tool);
    KeyBind.key("key.mouse.left", true);   
}
function eatFood()
{
    getItemInHotbar(food);
    
    KeyBind.keyBind("key.use", true);
    
    while (true) 
    {
        if (p.getFoodLevel() >= 20)
        {
            break;
        }
        else
        {
            Client.waitTick();
        }
    }
    KeyBind.keyBind("key.use", false);
}
function getItemInHotbar(item) {
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) {

        if (inv.getSlot(i+36).getItemID() == item) {
            inv.setSelectedHotbarSlotIndex(i);
            break;
        }
        Client.waitTick();
    }
}
function breakingBlock()
{
    while (true)
    {
        if (p.getFoodLevel() < 20)
        {
            eatFood();
        }
        breakBlock();
    }
}
breakingBlock();
