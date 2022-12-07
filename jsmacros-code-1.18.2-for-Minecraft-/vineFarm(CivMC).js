const xEast = 6320;
const xWest = 6239;
const zNorth = -1390;
const zSouth = -1348;

const food = "minecraft:bread" // Set to whatever food item ID you are eating
const tool = "minecraft:shears"

const p = Player.getPlayer();
var selectedHotBarSlot = 0;

var line = 0;

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

// Select's an item from the hotbar. 
// If an item doesn't exist in the hotbar, 
// it will take it from the main inventory.

function getItemInHotbar(item) 
{
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) 
    {
        if (inv.getSlot(i+36).getItemID() == item) 
        {
            inv.setSelectedHotbarSlotIndex(i);
            selectedHotBarSlot = i;
            break;
        }
        else if (i == 8)
        {
            swapFromMain(item);
        }
        Client.waitTick();
    }
}

// Function swaps an item from your main inventory
// into the player's first Hotbar set. 

function swapFromMain(item)
{
    const inv = Player.openInventory();
    for (let i = 9; i < 36; i++)
    {
        if (inv.getSlot(i).getItemID() == item)
        {
            inv.swap(i,36);
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

function collectVinesEven()
{
    KeyBind.keyBind("key.attack", true);
    while (p.getPos().x <= xEast + 0.5)
    {
        getItemInHotbar(tool);
        
        if (shearCount() == 0)
        {    
            KeyBind.keyBind("key.attack", false);
            end();
            Time.sleep(11000);
        }
        
        KeyBind.keyBind("key.right", true);
        Time.sleep(245);
        KeyBind.keyBind("key.right", false);
    
        p.lookAt(180, 45);
        Client.waitTick(20);
        
        p.lookAt(180, 35);
        Client.waitTick(20);
    
        p.lookAt(180, 15);
        Client.waitTick(20);
        
        p.lookAt(180, 45);
    }
    KeyBind.keyBind("key.attack", false);
    dumpVines();
}

function collectVinesOdd()
{
    KeyBind.keyBind("key.attack", true);
    while (p.getPos().x >= xWest + 0.5)
    {
        getItemInHotbar(tool);
    
        if (shearCount() == 0)
        {
            KeyBind.keyBind("key.attack", false);
            end();
            Time.sleep(11000);
        }
    
        KeyBind.keyBind("key.right", true);
        Time.sleep(245);
        KeyBind.keyBind("key.right", false);
    
        p.lookAt(0, 45);
        Client.waitTick(20);
        
        p.lookAt(0, 35);
        Client.waitTick(20);
    
        p.lookAt(0, 15);
        Client.waitTick(20);
        
        p.lookAt(0, 45);
    }
    KeyBind.keyBind("key.attack", false);
    dumpVines();
}

function dumpVines()
{   
    if (line % 2 == 0) 
    {
        p.lookAt(145, 0);
    }
    else
    {
        p.lookAt(-45, 0);
    }
    
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:vine") 
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
}

function changingLines()
{
    p.lookAt(0,0);
     
    let evenToOdd = Math.ceil((line+1)/2);
    let oddToEven = Math.ceil(line/2);   
    
    let newLine = line + 1
        
    Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
    
    if (line % 2 == 0)
    {    
        while (p.getPos().z <= zNorth + 0.5 + (evenToOdd*2) + (oddToEven*6))
        {
            KeyBind.keyBind("key.forward", true);
        }
        KeyBind.keyBind("key.forward", false);
    }
    else 
    {
        while (p.getPos().z <= zNorth + 0.5 + (evenToOdd*2) + (oddToEven*6))
        {
            KeyBind.keyBind("key.forward", true);
        }
        KeyBind.keyBind("key.forward", false);
    }
    line++; 
}
function farmingVines()
{
    while (true)
    {
        getItemInHotbar(tool);
    
        eatFood(food);
    
        if (line % 2 == 0)
        {
            p.lookAt(180, -10);
            collectVinesEven();
        }
        else
        {
            p.lookAt(0, -10);
            collectVinesOdd();
        }
        
        let newLine = line + 1; 
        if (newLine == 12)
        {
             loop();
        }
        else
        {
            changingLines();
        }
    }
}
function loop()
{     
    line = 0;
    Chat.log("All rows finished. Now looping back.");
    
    p.lookAt(180,0);
    
    while (p.getPos().z >= zNorth + 0.5)
    {
        KeyBind.keyBind("key.forward", true);
        KeyBind.keyBind("key.jump", true);
    }
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.jump", false);
}
function shearCount()
{
    let count = 0;
    
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++) 
    {
        if (inv.getSlot(i).getItemID() == "minecraft:shears") 
        {
            count++;
        }
        else 
        {
            Client.waitTick();
        }
    }
    return count;
}
function end()
{
    Chat.say("/g hue VineFarm Bot: No more shears. Logging out.");
    Chat.say("/logout");
}

farmingVines();
