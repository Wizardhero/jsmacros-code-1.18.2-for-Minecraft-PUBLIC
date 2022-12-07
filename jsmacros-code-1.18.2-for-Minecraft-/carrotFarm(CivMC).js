// HuM4nB31nG's Crop Bot
// Modified by Mokotowskie
// Used for any of the major crop farms (potato, wheat, carrot, beet)
// Modified to be able to shift-click items into chests and auto-resume harvesting/replanting.
// Adaption of wheatScript(CivMC).js by MechanicalRift

// NOTE - PLEASE READ: This script was specifically made for the Yoahtl beetfarm near Himmelfalke.

// Make sure that you have a rectangular farm, you have the food you want to eat in the hotbar,
// And that you have room in your hotbar for whatever item you need to replant.

// Boundaries of the beetroot farm.

const xEast = 6607;
const xWest = 6416;
const zNorth = -1520;
const zSouth = -1377;

// The coords of the front of the chest. 
// Example: If a double chest is taking x coordinate -53 and z coordinates 140 and 141, and you are facing east,
// you set the x coordinate to be -54 and the z coordinate to be 140.5. 
// Image link of Journey Map as Example: https://i.imgur.com/hVtm28d.png

//const xChest = -4566;
//const zChest = 6317;

// NOTE: The crop and food constants have been modified such that they now take in the item's ID. 
// Website for list of unit IDs in minecraft: https://minecraftitemids.com/

// YOU CAN CHANGE THIS BELOW:

const food = "minecraft:carrot" // Set to whatever food item ID you are eating

const p = Player.getPlayer();
var selectedHotBarSlot = 0;

// NOTE: Change this variable to go back to the row you were going to harvest/replant if you were interrupted.
// This variable is used to calculate the amount of rows you harvested/replanted;
// this is so that when your player stores stuff in the chest and returns to its row,
// the player won't have to go through each row again.

// YOU CAN CHANGE THIS BELOW:

var line = 0;

var x = xWest + line + 0.2;

// The amount of time that is added everytime you go back to the chest, 
// so the bot can wait and render the chunk the chest is located in.

var minute = 0;
var waitTime = 0;

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

// Harvests the row and replants it.
function farmLine() 
{
    // Start at west, harvest to east, move back and click
    
    p.lookAt(180, 90);
    
    // Move north and harvest!
    
    Chat.log("Harvesting and replanting of row "+ line +" commenced!");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.use", true);
   
    while (true)
    {
        if (p.getPos().z <= zNorth + 0.5) 
        {
            break;
        }
        else 
        {
            Client.waitTick()
        }
    }
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.use", false);
    
    Client.waitTick();
    
    dumpCrops();
    
    Client.waitTick();
    
    var newLine = line + 1;
    Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
    
    KeyBind.keyBind("key.right", true);
    
    while (true) {
        if (p.getPos().x >= xWest + line + 1) {
            break;
        }
    }
    
    KeyBind.keyBind("key.right", false);
    
    Client.waitTick(5);
        
    // Move east and farm.
    KeyBind.keyBind("key.back", true);
    KeyBind.keyBind("key.use", true);
    
    while (true) {
        if (p.getPos().z >= zSouth + 0.5) {
            break;
        }
    }
    
    KeyBind.keyBind("key.back", false);
    KeyBind.keyBind("key.use", false);
}

// Checks for player's food level.

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
            Client.waitTick(20);
        }
    }
    
    KeyBind.keyBind("key.use", false);
}

// Select's an item from the hotbar. 
// If an item doesn't exist in the hotbar, 
// it will take it from the main inventory.

function getItemInHotbar(item) {
const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) {
        if (inv.getSlot(i+36).getItemID() == item) {
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

function dumpCrops()
{
    //mechanical's storage method from old obby script
    //stores the carrot into the chest
    p.lookAt(180, 45);
    Client.waitTick(20);
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(60);
    //YES IT REQURIES THE INVS CAUSE JSMACROS IS FUCKING RETARDED
    const invs = Player.openInventory();
    Client.waitTick(10);
    for(let x=54;x<90;x++){
        Client.waitTick();
        if ((invs.getSlot(x).getItemID() == "minecraft:carrot"))
        {
            //Chat.log(x);
            invs.quick(x);
            Client.waitTick();
        }
        Client.waitTick();
    }
    
    invs.close();

    Client.waitTick();
    p.lookAt(180, 90);
    Client.waitTick();
}

// Main function

function farmLines()
{
    // Assumes you are already in position.
    
    while (true) 
    {        
        // Eat
        eatFood();
            
        // Farm line
        farmLine();
             
        // Move one
        x += 2;
            
        var newLine = line + 2;
            
        if (newLine >= 192)
        {
        
            KeyBind.keyBind("key.forward", false);
            KeyBind.keyBind("key.attack", false);
            end();
            Client.waitTick(220);
        }
            
        Chat.log("Row "+ line+1 +" finished! Moving on to row "+ newLine +"!");
            
        KeyBind.keyBind("key.right", true);
        line = line + 2;
        while (true) 
        {
           if (p.getPos().x >= x) 
           {
               break;
           } 
           else 
           {
               Client.waitTick()
           }
        }
        KeyBind.keyBind("key.right", false);
        Client.waitTick();
   }
}
function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}
// Execution

farmLines();
