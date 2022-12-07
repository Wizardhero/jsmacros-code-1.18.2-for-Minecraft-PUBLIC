const zNorth = 0000;
const zSouth = 0000;
const xEast = 0000;
const xWest = 0000;

const p = Player.getPlayer();

const food = "XXXX";
const tool = "XXXX";

var directionChecker = 0;

var line = 0;
var lineEven = 0;
var lineOdd = 0;

function chop1()
{
    var selectedHotbarSlot = 36;   
    
    p.lookAt(180, 20);
    
    Client.waitTick(20);
    
    Chat.log("Chopping pumpkins at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
     
    var number = 1;
    
    while (p.getPos().z >= zNorth + 0.50)
    {
        const inv = Player.openInventory();
        
        var pos

        do {
            KeyBind.keyBind("key.forward", false);
            Client.waitTick(3);
            KeyBind.keyBind("key.forward", true);
            Client.waitTick(4);
            pos = p.getPos().toString()
            Client.waitTick()
           }         
           
           while (p.getPos().toString() != pos)
           
           p.lookAt(180, 40);
                
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
    Client.waitTick(5);
}
function chop2()
{  
    var selectedHotbarSlot = 36;   
    
    p.lookAt(0, 20);
    
    Client.waitTick(20);
    
    Chat.log("Chopping pumpkins at row "+ line +".");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
     
    var number = 1;
    
    while (p.getPos().z <= zSouth + 0.50)
    {
        const inv = Player.openInventory();
        
        var pos

        do {
            KeyBind.keyBind("key.forward", false);
            Client.waitTick(3);
            KeyBind.keyBind("key.forward", true);
            Client.waitTick(4);
            pos = p.getPos().toString()
            Client.waitTick()
           }         
           
           while (p.getPos().toString() != pos)
            
           p.lookAt(0, 40);   
                                                         
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
    Client.waitTick(5);
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
function dumpPumpkin()
{
    p.lookAt(0, 35);
    
    Client.waitTick(20);
    
    const inv = Player.openInventory();
    
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:pumpkin")
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
function facingNorth()
{
    var x = xEast - (lineEven * 3) - lineOdd + 0.5 
    
    p.lookAt(0, 20);
    
    var newLine = line  + 1;
    
    if (newLine == 48)
    {
        
        KeyBind.keyBind("key.forward", false);
        KeyBind.keyBind("key.attack", false);
        end();
        Time.sleep(11000);
    }
    
    Chat.log("Moving on to row "+ newLine +".");
        
    Client.waitTick(10);
    
    KeyBind.keyBind("key.sneak", true);
    KeyBind.keyBind("key.right", true);
    
    x -= 3;
    
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
    lineEven += 1;
    
    KeyBind.keyBind("key.sneak", false);
    KeyBind.keyBind("key.right", false);
    
    directionChecker = 1; 
}
function facingSouth()
{
    var x = xEast - (lineEven * 3) - lineOdd + 0.5;  
    
    p.lookAt(180, 20);
    
    var newLine = line  + 1;
    
    Chat.log("Moving on to row "+ newLine +".");
    
    Client.waitTick(10);
    
    KeyBind.keyBind("key.sneak", true);
    KeyBind.keyBind("key.left", true);
    
    x -= 1; 
    
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
    lineOdd += 1;
    
    KeyBind.keyBind("key.sneak", false);
    KeyBind.keyBind("key.left", false);
    
    directionChecker = 0; 
}
function choppingLines()
{
    while (true)
    {       
        eatFood();

        getItemInHotbar(tool);       
        
        if (directionChecker == 0)
        {
            if (checkInventory() >= 36)
            {   
                Chat.log("Dumping excess pumpkin.");
                dumpPumpkin();
            }
            
            chop1();

            facingNorth();
        }
        else
        {
            chop2();

            facingSouth();
        }    
    }
}
function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}

choppingLines();
