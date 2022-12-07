// HuM4nB31nG's Crop Bot
// Modified by Mokotowskie
// Used for any of the major crop farms (potato, wheat, carrot, beet)
// Modified to be able shift-click items into chests and auto-resume harvesting/replanting.

// Make sure that you have a rectangular farm, you have the food you want to eat in the hotbar,
// And that you have room in your hotbar for whatever item you need to replant.

// Set to the boundaries of your farm

const xEast = -4618;
const xWest = -4707;
const zNorth = 6392;
const zSouth = 6454;

// IMPORTANT - PLEASE READ - The crop and food constants have been modified such that they now take in the item's ID. 
// Website for list of unit IDs in minecraft: https://minecraftitemids.com/

const crop = "minecraft:potato" // Set to "minecraft:potato" or "minecraft:wheat_seeds" or "minecraft_carrot"
const food = "minecraft:baked_potato" // Set to whatever food item ID you are eating

const p = Player.getPlayer();

var selectedHotBarSlot = 0;

// NOTE: The crop and food constants have been modified such that they now take in the item's ID. 
// Website for list of unit IDs in minecraft: https://minecraftitemids.com/

// YOU CAN CHANGE THIS BELOW:

var line = 31; 

// Harvests the row and replants it.

function farmLine() 
{
    // Start at west, harvest to east, move back and click
    
    p.lookAt(0, 90);
    
    // Move south and harvest!
    
    Chat.log("Harvesting and replanting of row "+ line +" commenced!");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
    
    while (true)
    {
        if (p.getPos().z >= zSouth + 0.5) 
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

    // Move north and farm.
    KeyBind.keyBind("key.back", true);
    KeyBind.keyBind("key.use", true);
    
    while (true) 
    {
        if (p.getPos().z <= zNorth + 0.5) 
        {
            break;
        } 
        else 
        {
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

function checkInventory()
{
    var count = 0;
    const inv = Player.openInventory();
    for (let i = 0; i < inv.getTotalSlots(); ++i)
    {
      if (!inv.getSlot(i).isEmpty()) 
      {
        count++;
      }
    }
    return count; 
}

// Drops the crop into the water drop.

function waterDrop()
{
    Chat.log("Throwing potatoes in the water drop.");
    
    // Turn the player around to face the water drop.
   
    p.lookAt(180, 70);
    Time.sleep(1000);
    
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if (!inv.getSlot(i).isEmpty())
        {
            if (food === "minecraft:potato" && i == 36)
            {
                if (inv.getSlot(36).getItemID() === "minecraft:potato")
                {
                    Client.waitTick();
                }
                else
                {
                    for (let j = 9; j < 45; j++)
                    {
                        if (inv.getSlot(j).getItemID() === "minecraft:potato")
                        {
                            inv.swap(j, 36);
                            Client.waitTick();
                        }
                        Client.waitTick();
                    }
                }
            }
            else if (inv.getSlot(i).getItemID() === food && food !== "minecraft:potato")
            {
                Client.waitTick();
            }
            else if (inv.getSlot(i).getItemID() === crop || inv.getSlot(i).getItemID === "minecraft:potato")
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
        else
        {
            Client.waitTick();
        }  
    }
    dumpBadPotato();
}

// Turns the player around and throws away the poisonous potatoes.

function dumpBadPotato()
{
  p.lookAt(-90,-15);
  
  Chat.log("Disposing of poisonous potatoes.");
  
  Time.sleep(1000);
  
  const inv = Player.openInventory()
  for (let i = 9; i < 45; i++) 
  {
      if(inv.getSlot(i).getItemID() == "minecraft:poisonous_potato")
      {
          inv.click(i);
          Client.waitTick();
          inv.click(-999);
          Client.waitTick();
      }
      Client.waitTick();
  }
}

// Main function.

function farmLines()
{
    // Assumes you are already in position.
    
    var x = xEast - line + 0.5;
    
    while (true) 
    {        
        if(checkInventory() >= 36)
        {
            waterDrop();
            Time.sleep(1000);
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
            x -= 1;
            var newLine = line + 1;
            Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
            KeyBind.keyBind("key.right", true);
            line++;
            while (true) 
            {
               if (p.getPos().x <= x) 
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

// Execution

farmLines();
