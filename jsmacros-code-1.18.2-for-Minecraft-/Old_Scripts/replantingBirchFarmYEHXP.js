const zNorth = 7922;
const zSouth = 8062;
const xEast = -1586;
const xWest = -1761;

const p = Player.getPlayer();

const food = "minecraft:baked_potato";
const sapling = "minecraft:birch_sapling";

var directionChecker = 0;

var line = 0;

function replant1()
{
    var selectedHotbarSlot = 36;

    p.lookAt(90, 90);
    
    Client.waitTick(20);
    
    Chat.log("Replanting saplings at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.use", true);
    
    while (p.getPos().x >= xWest + 0.80)
    {
        const inv = Player.openInventory();
        
        if (p.getPos().x <= xWest + 4)
        {
            KeyBind.keyBind("key.sneak", true);
        }
        if (inv.getSlot(selectedHotbarSlot).getItemID == sapling)
        {
            Client.waitTick();
        }
        else
        {
            getItemInHotbar(sapling);
            Client.waitTick();
        }
    }
    
    p.lookAt(0, 90);
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.use", false);
    KeyBind.keyBind("key.sneak", false);
}
function replant2()
{
    var selectedHotbarSlot = 36;

    p.lookAt(-90, 90);
    
    Client.waitTick(20);
    
    Chat.log("Replanting saplings at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.use", true);
    
    while (p.getPos().x <= xEast + 0.20)
    {
        const inv = Player.openInventory();
            
        if (p.getPos().x >= xEast - 3)
        {
            KeyBind.keyBind("key.sneak", true);
        }
        if (inv.getSlot(selectedHotbarSlot).getItemID == sapling)
        {
            Client.waitTick();
        }
        else
        {
            getItemInHotbar(sapling);
            Client.waitTick();
        }     
    }
    
    p.lookAt(0, 90);
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.use", false);
    KeyBind.keyBind("key.sneak", false);
}
function getItemInHotbar(item) 
{
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) 
    {
        if (inv.getSlot(i+36).getItemID() == item) 
        {
            inv.setSelectedHotbarSlotIndex(i);
            
            if (inv.getSlot(i+36).getItemID() == sapling)
            {
                selectedHotBarSlot = i + 36;
            }

            break;
        }
        else if (i == 8)
        {
            getFromMain(item);
        }
        Client.waitTick();
    }
}
function getFromMain(item)
{
    const inv = Player.openInventory();
    
    for (let i = 9; i < 36; i++)
    {
        if (inv.getSlot(i).getItemID() == item)
        {
            if (item === sapling)
            {
                inv.click(i);
                Client.waitTick();
                inv.click(36);
                Client.waitTick();
                selectedHotbarSlot = 36;

                inv.setSelectedHotbarSlotIndex(0);
            }
            else
            {
                inv.click(i);
                Client.waitTick();
                inv.click(37);
                Client.waitTick();
                selectedHotbarSlot = 37;

                inv.setSelectedHotbarSlotIndex(1);
            }

            break;
        }
        else
        {
            Client.waitTick();
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
function facingEast()
{
    var z = zNorth + (line * 5) + 0.5;   
    
    p.lookAt(0, 90);
    
    var newLine = line  + 1;
    
    if (newLine == 29)
    {
        
        KeyBind.keyBind("key.forward", false);
        KeyBind.keyBind("key.use", false);
        Chat.say("/logout");
        Time.sleep(11000);
    }
    
    Chat.log("Moving on to row "+ newLine +".");
        
    Client.waitTick(10);
    
    KeyBind.keyBind("key.sneak", true);
    KeyBind.keyBind("key.forward", true);
    
    z += 5;
    
    while (true)
    {
        if (p.getPos().z >= z)
        {
            break;
        }
        else
        {
            Client.waitTick();
        }
    }
    
    line += 1;
    
    KeyBind.keyBind("key.sneak", false);
    KeyBind.keyBind("key.forward", false);
    
    directionChecker = 1; 
}
function facingWest()
{
    var z = zNorth + (line * 5) + 0.5;   
    
    p.lookAt(0, 90);
    
    var newLine = line  + 1;
    
    Chat.log("Moving on to row "+ newLine +".");
    
    Client.waitTick(10);
    
    KeyBind.keyBind("key.sneak", true);
    KeyBind.keyBind("key.forward", true);
    
    z += 5;
    
    while (true)
    {
        if (p.getPos().z >= z)
        {
            break;
        }
        else
        {
            Client.waitTick();
        }
    }
    
    line += 1;
    
    KeyBind.keyBind("key.sneak", false);
    KeyBind.keyBind("key.forward", false);
    
    directionChecker = 0; 
}
function replantLines()
{
    while (true)
    {    
        eatFood();

        getItemInHotbar(sapling); 

        if(directionChecker == 0)
        {
            replant1();

            facingEast();
        }
        else
        {
            replant2();

            facingWest();
        }
    }
}
function end()
{
    Chat.log("Job is finished. Now logging out.");
    Chat.say("/logout");
}

replantLines();
