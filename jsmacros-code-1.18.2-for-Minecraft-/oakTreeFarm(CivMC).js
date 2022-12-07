const zNorth = -2016;
const zSouth = -1861;
const xEast = 6398;
const xWest = 6258;

//Checks if AutoJump is enabled, throws an error if it is.
function getAutoJump()
{
    var gameOptions = Client.getGameOptions(); //We need to get the options class...
    var gameOptionsRaw = gameOptions.getRaw(); //and then get the raw versions ...
    return gameOptionsRaw.field_1848; //Return the value of autoJump according to Yarn mappings...
}
if(getAutoJump()==true)
{
    Chat.log("CANNOT START SCRIPT: Please Disable AutoJump before starting the script!");
    throw "AutoJump is enabled, cannot continue.";
}

const p = Player.getPlayer();

const food = "minecraft:bread";
const tool = "minecraft:diamond_axe";
const sapling = "minecraft:oak_sapling";

var chopLocation = 0; 

var line = 0;

function chop()
{
    var selectedHotbarSlot = 36;   
    
    chopLocation = zSouth + 0.80;
    
    p.lookAt(180, 5);
    
    Client.waitTick(20);
    
    Chat.log("Chopping trees at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
     
    var number = 1;
    
    while (p.getPos().z >= zNorth + 0.5)
    {
        if (p.getPos().z <= chopLocation + 4.5 && p.getPos().z >= chopLocation + 3.5)
        {  
        
            const inv = Player.openInventory();
            
            if (inv.getSlot(selectedHotbarSlot).getDamage() >= 1551)
            {
                Chat.log("Replacing Axe");
                KeyBind.keyBind("key.forward", false);
                KeyBind.keyBind("key.attack", false);
            
                Client.waitTick(10);
            
                axeSwap();
            
                Client.waitTick(10);
            
                KeyBind.keyBind("key.forward", true);
                KeyBind.keyBind("key.attack", true);
            }    
            
            KeyBind.keyBind("key.forward", false);
            
            Client.waitTick(40);
            
            p.lookAt(180, 14);
            
            Client.waitTick(20);
            
            KeyBind.keyBind("key.forward", true);
            
            Client.waitTick(10);
        }      
        if (p.getPos().z <= chopLocation)
        {
            chopLocation -= 5;
            Chat.log("Chopping tree #"+ number);
            number++;
            cutTree();
        }
    }
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
}
function replant()
{
    var selectedHotbarSlot = 38;

    p.lookAt(0, 90);
    
    Client.waitTick(20);
    
    Chat.log("Replanting saplings at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.use", true);
    
    while (p.getPos().z <= zSouth + 0.50)
    {
        const inv = Player.openInventory();
        
        if (p.getPos().z >= zSouth - 5)
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
    
    p.lookAt(90, 90);
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.use", false);
    KeyBind.keyBind("key.sneak", false);
}

function cutTree()
{
    KeyBind.keyBind("key.forward", false);
    p.lookAt(180, -90);
    Client.waitTick(60);
    p.lookAt(180, 5);
    KeyBind.keyBind("key.forward", true);
}
function getItemInHotbar(item) 
{
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) 
    {
        if (inv.getSlot(i+36).getItemID() == item) 
        {
            inv.setSelectedHotbarSlotIndex(i);
            
            if (inv.getSlot(i+36).getItemID() == tool)
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
            if (item === tool)
            {
                inv.click(i);
                Client.waitTick();
                inv.click(36);
                Client.waitTick();
                selectedHotBarSlot = 36;
                
                inv.setSelectedHotbarSlotIndex(0);
            }
            else if (item === food)
            {
                inv.click(i);
                Client.waitTick();
                inv.click(37);
                Client.waitTick();
                selectedHotBarSlot = 37;
                
                inv.setSelectedHotbarSlotIndex(1);
            }
            else
            {
                inv.click(i);
                Client.waitTick();
                inv.click(38);
                Client.waitTick();
                selectedHotBarSlot = 38;
                
                inv.setSelectedHotbarSlotIndex(2);
            }
            
            break;
        }
        else
        {
            Client.waitTick();
        }
    }
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
        }
    }
    return count; 
}
function dumpOak()
{
    p.lookAt(45, 0);
    
    Client.waitTick(20);
    
    const inv = Player.openInventory();
    
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:oak_log")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == "minecraft:stripped_oak_log")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == "minecraft:oak_leaves")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == "minecraft:stick")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else
        {
            Client.waitTick();
        }
    }
    Client.waitTick();
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
function axeSwap()
{
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if ((inv.getSlot(i).getItemID() == tool) && (Player.openInventory().getSlot(i).getDamage() < 1541))
        {      
            Chat.log("Swapping axes");
            
            inv.swap(i,36);
            Client.waitTick(60);
            break;
        }
        Client.waitTick();
    }
}
function facingSouth()
{
    var x = xEast - (line * 5) + 0.5;   
    
    p.lookAt(90,15);
    
    var newLine = line  + 1;
      
    if (newLine == 29)
    {
        KeyBind.keyBind("key.forward", false);
        KeyBind.keyBind("key.attack", false);
        end();
        Time.sleep(11000);
    }
    
    Chat.log("Moving on to row "+ newLine +".");
    
    Client.waitTick(10);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
    KeyBind.keyBind("key.sneak", true);
    
    p.lookAt(90,5);
    Client.waitTick(60);
    p.lookAt(90,15);
    
    x -= 5;
    
    while (true)
    {
        if (p.getPos().x <= x)
        {
            break;
        }
        else
        {
            Client.waitTick();
        }
    }
    
    line += 1;
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
    KeyBind.keyBind("key.sneak", false);
}
function choppingAndReplantingLines()
{
    while (true)
    {    
        eatFood();
        
        Client.waitTick();
        
        Chat.log("Dumping oak.");
        dumpOak();  

        getItemInHotbar(tool);       
        
        chop();
        
        Client.waitTick(10);
        
        getItemInHotbar(sapling); 
        
        replant();
        
        getItemInHotbar(tool);
        
        Client.waitTick(10);
        
        facingSouth();
    }
}
function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}

choppingAndReplantingLines();
