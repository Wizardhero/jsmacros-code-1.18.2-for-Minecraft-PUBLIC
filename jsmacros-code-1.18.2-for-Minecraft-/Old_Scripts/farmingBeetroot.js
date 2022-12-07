// HuM4nB31nG's Crop Bot
// Modified by Mokotowskie
// Used for any of the major crop farms (potato, wheat, carrot, beet)
// Modified to be able to shift-click items into chests and auto-resume harvesting/replanting.

// NOTE - PLEASE READ: This script was specifically made for the Yoahtl beetfarm near Himmelfalke.

// Make sure that you have a rectangular farm, you have the food you want to eat in the hotbar,
// And that you have room in your hotbar for whatever item you need to replant.

// Boundaries of the beetroot farm.

const xEast = -4450;
const xWest = -4566;
const zNorth = 6193;
const zSouth = 6317;

// The coords of the front of the chest. 
// Example: If a double chest is taking x coordinate -53 and z coordinates 140 and 141, and you are facing east,
// you set the x coordinate to be -54 and the z coordinate to be 140.5. 
// Image link of Journey Map as Example: https://i.imgur.com/hVtm28d.png

//const xChest = -4566;
//const zChest = 6317;

// NOTE: The crop and food constants have been modified such that they now take in the item's ID. 
// Website for list of unit IDs in minecraft: https://minecraftitemids.com/

// YOU CAN CHANGE THIS BELOW:

const crop = "minecraft:beetroot_seeds" // Set to "minecraft:potato" or "minecraft:wheat_seeds" or "minecraft_carrot"
const food = "minecraft:baked_potato" // Set to whatever food item ID you are eating

const p = Player.getPlayer();
var selectedHotBarSlot = 0;

// NOTE: Change this variable to go back to the row you were going to harvest/replant if you were interrupted.
// This variable is used to calculate the amount of rows you harvested/replanted;
// this is so that when your player stores stuff in the chest and returns to its row,
// the player won't have to go through each row again.

// YOU CAN CHANGE THIS BELOW:

var line = 0;

// The amount of time that is added everytime you go back to the chest, 
// so the bot can wait and render the chunk the chest is located in.

var minute = 0;
var waitTime = 0;

// Harvests the row and replants it.

function farmLine() 
{
    // Start at west, harvest to east, move back and click
    
    p.lookAt(180, 90);
    
    // Move north and harvest!
    
    Chat.log("Harvesting and replanting of row "+ line +" commenced!");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
   
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
    KeyBind.keyBind("key.attack", false);
    
    getItemInHotbar(crop);
    
    Client.waitTick();
    
    // Move east and farm.
    KeyBind.keyBind("key.back", true);
    KeyBind.keyBind("key.use", true);
    
    while (true) {
        if (p.getPos().z >= zSouth + 0.5) {
            break;
        } else {
        const inv = Player.openInventory();
            if (inv.getSlot(selectedHotBarSlot).getItemID() == crop)
            {
                Client.waitTick();
            }
            else
            {
                getItemInHotbar(crop);
                Client.waitTick();
            }
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
            swapFromMain();
        }
        Client.waitTick();
    }
}

// Function returns the number of beetroots 
// in the player's inventory.

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

// Function swaps an item from your main inventory
// into the player's first Hotbar set. 

function swapFromMain()
{
    const inv = Player.openInventory();
    for (let i = 9; i < 36; i++)
    {
        if (inv.getSlot(i).getItemID() == crop)
        {
            inv.swap(i,36);
            break;
        }
    }
}

// Function returns the number of beetroots 
// in the player's inventory.

function beetrootCount()
{
    var count = 0;
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:beetroot")
        {
            count++;
        }
    }
    return count;
}

// Player goes certain distance northwest to drop excess seeds.

function dumpSeeds()
{
  p.lookAt(90,-15);
  Client.waitTick();
  
  const inv = Player.openInventory()
  for (let i = 9; i < 45; i++) 
  {
      if(inv.getSlot(i).getItemID() == crop)
      {
          inv.click(i);
          Client.waitTick();
          inv.click(-999);
          Client.waitTick();
      }
      Client.waitTick();
  }
  Client.waitTick();
}

// When inventory is full and beetroot quota is met, 
// player will head towards the chest.

/*
function goToChest()
{
   Chat.log("Going back to chest to deposit beetroots.");
   KeyBind.keyBind("key.forward", true);
    
//Heads to the west.
  
    p.lookAt(90, 30);
    while (true)
    {
        if (p.getPos().x <= xChest + 0.5)
        {
            break;
        }   
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    Time.sleep(1500);
    
    //Turns the player around to face the chest.
    
    p.lookAt(0, 10);
    KeyBind.keyBind("key.forward", true);
    while (true)
    {
        if (p.getPos().z >= (zChest + 0.5))
        {
            break;
        }
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    deposit();
}
*/

/*
function goToBed()
{
    Chat.log("Going to sleep.");
    KeyBind.keyBind("key.forward", true);
    
    //Heads to the west.
    
    p.lookAt(90, 30);
    while (true)
    {
        if (p.getPos().x <= xChest + 0.5)
        {
            break;
        }
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    Time.sleep(1500);
    
    //Turns the player around to face the bed.
    
    p.lookAt(90, 12);
    KeyBind.keyBind("key.forward", true);
    while (true)
    {
        if (p.getPos().z >= (-4566 + 0.5))
        {
            break;
        }
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Chat.log("zzzzzzzzzzzzzzzzzzzzzzzz");
    Time.sleep(5000)
    returnRoutine();
}
*/

function dumpCrops()
{
    p.lookAt(0, 55);
    
    Client.waitTick(20);
    
    const inv = Player.openInventory();
    
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:beetroot")
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

// Player goes through inventory and shift-click items 
// into storage.

/*
function deposit()
{   
    Chat.log("Depositing, wait three seconds.")
    Time.sleep(3000);
    const inv = Player.openInventory();
    for (let i = 54; i < 90 ; i++)
    { 
        var index = i;
        Chat.log("Number "+ i);
        if(!inv.getSlot(i).isEmpty())
        {
            if (food === "minecraft:beetroot" && index == 81)
            {
                //Chat.log("1st option");
                if (inv.getSlot(81).getItemID() === "minecraft:beetroot")
                {
                        Client.waitTick();
                }
                else
                {
                    for (let j = 54; j < 90; j++)
                    {
                        if (inv.getSlot(j).getItemID() === "minecraft:beetroot")
                        {
                            inv.swap(j,81);
                        }
                    Client.waitTick();
                    }
                }
                Client.waitTick();
            }
            else if(inv.getSlot(i).getItemID() === food && food !== "minecraft:beetroot")
            {
                //Chat.log("2nd option");
                Client.waitTick();
            } 
            else if(inv.getSlot(i).getItemID() === crop || inv.getSlot(i).getItemID() === "minecraft:beetroot")
            {
                //Chat.log("3rd option");
                inv.quick(i);
                Client.waitTick();
            }
            else
            {    
                //Chat.log("4th option");
                Client.waitTick();
            }
        }
        else
        {
            //Chat.log("no option");
            Client.waitTick();  
        }
    }
    KeyBind.keyBind("key.mouse.right", true);
    KeyBind.keyBind("key.mouse.right", false);
    inv.close();
    
    timeWait();
}
*/

// Forces the player to wait every minute more every time 
// it comes back to the chest to deposit.

/*
function timeWait()
{
    if (minute == 1)
    {
        Chat.log("Waiting "+ minute +" minute for the contents of the chest to empty");
        minute += 1;
        Client.waitTick(waitTime);
        waitTime += 1200;
        
        returnRoutine();
    }
    else if (minute > 1)
    {
        Chat.log("Waiting "+ minute +" minutes for the contents of the chest to empty");
        minute += 1;
        Client.waitTick(waitTime);
        waitTime += 1200;
        
        returnRoutine();
    }
    else
    {
        minute += 1;
        waitTime += 1200;
        
        returnRoutine();
    }
}
*/

// Takes you back to the row you came from.

/*
function returnRoutine()
{
    Chat.log("Returning back to row");
    Time.sleep(1500);
    p.lookAt(180, 30);
    KeyBind.keyBind("key.forward", true);
    
    while (true)
    {
        if (p.getPos().z <= zChest + 0.5)
        {
            break;
        }
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    Time.sleep(1500);
    p.lookAt(-90, 30);
    Time.sleep(1500);
    KeyBind.keyBind("key.forward", true);
    while (true)
    {
        if (p.getPos().x >= (xChest + line + 0.5))
        {
            break;
        }
        Client.waitTick();
    }
    KeyBind.keyBind("key.forward", false);
    farmLines();    
}
*/

// Main function

function farmLines()
{
    // Assumes you are already in position.
    
    var x = xWest + line + 0.2;
    
    while (true) 
    {        
        if(checkInventory() >= 36)
        {
            if(beetrootCount() >= 21)
            {
                //goToChest();
                
                dumpCrops();
            }
            else
            {
                dumpSeeds();
                Client.waitTick(20);
            }
        }
        else
        {
            // Eat
            eatFood();
            
            // Get potato
            getItemInHotbar(crop);
  
            // Farm line
            farmLine();
             
            // Move one
            x += 1;
            
            var newLine = line + 1;
            
            if (newLine == 107)
            {
        
                KeyBind.keyBind("key.forward", false);
                KeyBind.keyBind("key.attack", false);
                end();
                Client.waitTick(220);
            }
            
            Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
            
            KeyBind.keyBind("key.right", true);
            line++;
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
}

function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}
// Execution

farmLines();
