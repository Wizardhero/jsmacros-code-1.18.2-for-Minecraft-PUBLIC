const p = Player.getPlayer();
const inv = Player.openInventory();
const weapon = "minecraft:diamond_sword";
const food = "minecraft:baked_potato";
function kill()
{
    var selectedHotbarSlot = 36; 
    
    p.lookAt(77, 18.9);
    
    Client.waitTick(4);
    KeyBind.key("key.mouse.left", true);
    KeyBind.key("key.mouse.left", false);  
    Client.waitTick(4)  
    
    p.lookAt(85, 18.9);
    
    Client.waitTick(4);
    KeyBind.key("key.mouse.left", true);
    KeyBind.key("key.mouse.left", false);  
    Client.waitTick(4) 
    
    p.lookAt(90, 18.9);
    
    Client.waitTick(4);
    KeyBind.key("key.mouse.left", true);
    KeyBind.key("key.mouse.left", false);  
    Client.waitTick(4) 
    
    p.lookAt(95, 18.9);
    
    Client.waitTick(4);
    KeyBind.key("key.mouse.left", true);
    KeyBind.key("key.mouse.left", false);  
    Client.waitTick(4)
    
    if (inv.getSlot(selectedHotbarSlot).getDamage() >= 1551)
    {
        KeyBind.key("key.mouse.left", false); 
        Chat.log("Replacing Sword");
        
        swordSwap();
    }    
}
function swordSwap()
{
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if ((inv.getSlot(i).getItemID() == tool) && (Player.openInventory().getSlot(i).getDamage() < 1551))
        {      
            Chat.log("Swapping Swords");
            
            inv.swap(i,36);
            Client.waitTick(60);
            break;
        }
        else
        {
            Chat.log("No replacement sword found. Logging out.");
            Chat.log("/logout");
        }
        Client.waitTick();
    }
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
function killZombie()
{
    while (true)
    {
        if (p.getFoodLevel() < 20)
        {
            eatFood();
        }
        getItemInHotbar(weapon);
        kill();
        
    }
}
killZombie();
