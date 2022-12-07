const p = Player.getPlayer();

const tool = "minecraft:fishing_rod";
const food = "minecraft:baked_potato";
var fishingNumber = 0;

function fish()
{
    p.lookAt(-90, 25);
    grabFishingRod();
    
    fishingNumber++;
    
    Chat.log("Fishing attempt #"+ fishingNumber);
    
    KeyBind.key("key.use", true);
    Client.waitTick();
    KeyBind.key("key.use", false); 
    Client.waitTick(500);
    KeyBind.key("key.use", true);
    Client.waitTick();
    KeyBind.key("key.use", false);   
    
    Client.waitTick(10);
}
function grabFishingRod()
{
    for (let i = 0; i < 9; i++)
    {
        const inv = Player.openInventory();
        if (inv.getSlot(i+36).getItemID() == "minecraft:fishing_rod")    
        {
            inv.setSelectedHotbarSlotIndex(i);
            Client.waitTick();
            break;
        }
    }   
}
function fishingRodCheck()
{
    const inv = Player.openInventory();
    var check = inv.getSlot(36).getItemID();
    return check; 
}
function checkInventory()
{
    const inv = Player.openInventory();
    var count = 0;
    for (let i = 0; i < inv.getTotalSlots(); ++i)
    {
      if (!inv.getSlot(i).isEmpty()) 
      {
        count++;
        //Chat.log(count);
      }
    }
return count; 
}
function getItemInHotbar()
{
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++)
    {
        if (inv.getSlot(i+36).getItemID() == food)
        {
            inv.setSelectedHotbarSlotIndex(i);
            Client.waitTick();
            break;
        }
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

function goToChest()
{
    p.lookAt(90, 0);
    Client.waitTick(20);
   
    KeyBind.keyBind("key.forward", true);
   
    while (true)
    {
        if (p.getPos().x <= 145)
        {
            break;
        }
        Client.waitTick(); 
    }
    KeyBind.keyBind("key.forward", false);
     
    p.lookAt(180, 30);
    Client.waitTick(20);
    KeyBind.keyBind("key.use", true);
    KeyBind.keyBind("key.use", false);
    
    Chat.log("Please wait 3 seconds before contents are being deposited.");
    
    deposit();
}
function deposit()
{
    Client.waitTick(60);
    for (let i = 54; i < 90; i++)
    {
        const inv = Player.openInventory();
        if (inv.getSlot(i).getItemID() == tool)
        {
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == food)
        {
            Client.waitTick();
        }
        else
        {
            inv.quick(i); 
            Client.waitTick();
        }
    }   
    inv.close();
    Chat.log("Now returning to fishing.");
    Client.waitTick(60);
    returnToFishing();
}
function getANewFishingRod()
{
    p.lookAt(90, 0);
    Client.waitTick(20);
    KeyBind.keyBind("key.forward", true);
    while (true)
    {
        if (p.getPos().x <= 145)
        {
            break;
        }
        Client.waitTick(); 
    }
    KeyBind.keyBind("key.forward", false);
    
    p.lookAt(0, 30);
    Client.waitTick(20);
    
    KeyBind.keyBind("key.use", true);
    KeyBind.keyBind("key.use", false);
    
    Chat.log("Please wait 3 seconds before getting a new rod.");
    
    grabOne();
}
function grabOne()
{
    const inv = Player.openInventory();
    Client.waitTick(60);
    for (let i = 0; i < 54; i++)
    {
        const inv = Player.openInventory();
        if (inv.getSlot(i).getItemID() == tool && inv.getSlot(i).getDamage() < 63)  
        {
            inv.swap(i , 81); 
            Client.waitTick();
            break;
        }
        else
        {
            Client.waitTick();
        }
    }   
    inv.close();
    Chat.log("Now returning to fishing.");
    Client.waitTick(60);
    
    returnToFishing();
}
function returnToFishing()
{
    p.lookAt(-90, 0);
    Client.waitTick(20);
   
    KeyBind.keyBind("key.forward", true);
    while (true)
    {
        if (p.getPos().x >= 148)
        {
            break;
        }
        Client.waitTick(); 
    }
    KeyBind.keyBind("key.forward", false);
    
    p.lookAt(-90, 25);
    Client.waitTick(20);
}
function fishing()
{
    while (true)
    {
        if (checkInventory >= 36)
        {
            goToChest();
        }
        else
        {
            if (fishingRodCheck() !== tool || Player.openInventory().getSlot(36).getDamage >= 63)
            {
                getANewFishingRod();
            }
            
            eatFood();   
            
            grabFishingRod();
        
            fish();
        }
    }    
}

fishing();

