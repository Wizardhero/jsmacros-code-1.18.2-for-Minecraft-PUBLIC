const zNorth = -5966;
const zSouth = -5811;
const xEast = -1300;
const xWest = -1390;

const p = Player.getPlayer();

const food = "minecraft:baked_potato";
const tool = "minecraft:diamond_axe";
const sapling = "minecraft:birch_sapling";

var chopLocation = 0; 

var line = 0;

function chop()
{
    var selectedHotbarSlot = 36;   
    
    chopLocation = xWest + 0.20;
    
    p.lookAt(-90, 5);
    
    Client.waitTick(20);
    
    Chat.log("Chopping trees at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
     
    var number = 1;
    
    while (p.getPos().x <= xEast + 1)
    {
        if (p.getPos().x >= chopLocation - 4.5 && p.getPos().x <= chopLocation - 3.5)
        {  
            var pos
            
            KeyBind.keyBind("key.forward", false);
            
            Client.waitTick(10);
            
            KeyBind.keyBind("key.forward", true);
            
            p.lookAt(-90, 20); 
            
            pos = p.getPos().toString()
            
            Client.waitTick(10);
            
            while (p.getPos().x == pos)
            {
                p.lookAt(-90, 40);
            } 

        }      
        if (p.getPos().x >= chopLocation)
        {
            chopLocation += 5;
            Chat.log("Chopping tree #"+ number);
            number++;
            cutTree();
            Client.waitTick(5);
        }
          
        const inv = Player.openInventory();
            
        if (inv.getSlot(selectedHotbarSlot).getDamage() >= 1551)
        {
            Chat.log("Replace");
            KeyBind.keyBind("key.forward", false);
            KeyBind.keyBind("key.attack", false);
            
            Client.waitTick(10);
            
            axeSwap();
            
            Client.waitTick(10);
            
            KeyBind.keyBind("key.forward", true);
            KeyBind.keyBind("key.attack", true);
        }    
    }
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
}
function replant()
{
    var selectedHotbarSlot = 38;

    p.lookAt(90, 90);
    
    Client.waitTick(20);
    
    Chat.log("Replanting saplings at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.use", true);
    
    while (p.getPos().x >= xWest + 0.90)
    {
        const inv = Player.openInventory();
        
        if (p.getPos().x <= xWest + 5)
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
    
    p.lookAt(180, 90);
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.use", false);
    KeyBind.keyBind("key.sneak", false);
}

function cutTree()
{
    KeyBind.keyBind("key.forward", false);
    p.lookAt(-90, -90);
    Client.waitTick(60);
    p.lookAt(-90, 5);
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
function dumpBirch()
{
    p.lookAt(45, 0);
    
    Client.waitTick(20);
    
    const inv = Player.openInventory();
    
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:birch_log")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == "minecraft:stripped_birch_log")
        {
            inv.click(i);
            Client.waitTick();
            inv.click(-999);
            Client.waitTick();
        }
        else if (inv.getSlot(i).getItemID() == "minecraft:birch_leaves")
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
/*
function getStick()
{
    var stick = "minecraft:stick";
    
    getItemInHotbar(stick);
}
*/
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
        if ((inv.getSlot(i).getItemID() == tool) && (Player.openInventory().getSlot(i).getDamage() < 1551))
        {      
            Chat.log("Swapping axes");
            
            inv.swap(i,36);
            Client.waitTick(60);
            break;
        }
        Client.waitTick();
    }
}
/*
function facingEast()
{
    var z = zNorth + (line * 5) + 0.5;   
    
    p.lookAt(0, 15);
    
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
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
    KeyBind.keyBind("key.sneak", false);
    
    directionChecker = 1; 
}
*/
function facingWest()
{
    var z = zSouth - (line * 5) + 0.5;   
    
    p.lookAt(180, 15);
    
    var newLine = line  + 1;
      
    if (newLine == 32)
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
    
    z -= 5;
    
    while (true)
    {
        if (p.getPos().z <= z)
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
        
        Chat.log("Dumping birch.");
        dumpBirch();  

        getItemInHotbar(tool);       
        
        chop();
        
        Client.waitTick(10);
        
        getItemInHotbar(sapling); 
        
        replant();
        
        getItemInHotbar(tool);
        
        Client.waitTick(10);
        
        facingWest();
    }
}
function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}

choppingAndReplantingLines();
