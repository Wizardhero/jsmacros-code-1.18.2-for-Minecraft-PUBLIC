//Fixed by Link2006, Commented where i've fixed it. If any other issues arise, review this code again.

//Changelog:
//1.1 - Fixed opening random GUIs by making sure script only called keyBind() 
//1.2 - Fixed behavior where it would release D instead of A while it's holding A.
//1.3 - Fixed how movement was being done by adding a resync using surrounding blocks
//1.4 - Reduced by 1 the number of rows to do, made it configurable, made logout configurable. 

//Link2006 notes:
//This supposedly starts at NORTH EAST of the farm.
//If any issues happen again PLEASE PING ME.

const xEast = 7726;
const xWest = 7632;
const zNorth = -192;
const zSouth = -97;
const newLineStop = 32; //Link2006: The script will stop executing when attempting to go to this row ("Moving on to row X")
const doLogout = false; //Link2006: Should we log off when done? **NOTE: EXTRA SUGARCANE REMAINS IN A LOGGED OUT ACCOUNT**

const p = Player.getPlayer();

const crop = "minecraft:sugar_cane";
const food = "minecraft:carrot";

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
            swapFromMain();
        }
        Client.waitTick();
    }
}
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
function farmLine() 
{
	// Link2006: wtf are you talking about
    // Start at west, harvest to east, move back and click
    
    p.lookAt(0, 0);
    
    // Move north and harvest!
    
    Chat.log("Harvesting of row "+ line +" commenced!");
    
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
    
    Client.waitTick();
    
    dumpSeeds();
    
    Client.waitTick();
    
    p.lookAt(90, 0);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true); //Link2006: BRUH, This was set to .key("key.attack",true) which is NOT the right function to call at all
    
    Client.waitTick(8);
    
    p.lookAt(180, 0);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
    
    while (true)
    {
		//Link2006: This code sucks 
        if (p.getPos().z < zNorth + 0.5) 
        {
			//Chat.log(`DEBUG: ${p.getPos().z} < ${(zNorth + 0.5)}`);
            break;
        }
        else 
        {
			//Chat.log(`DEBUG: ${p.getPos().z} >= ${(zNorth + 0.5)}`);
            Client.waitTick()
        }
    }
	//Link2006: PLEASE STOP WALKING WE'RE HERE. 
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
    
    Client.waitTick(2); //wait 2 ticks here
    
	/*
    p.lookAt(90, 0);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true); //Link2006: BRUH, This was set to .key("key.attack",true) which is NOT the right function to call at all
    
    Client.waitTick(8);
    
    p.lookAt(180, 0); //Link2006: Idfk what i'm doing so whatever
	*/
}
function sugarcaneCount()
{
    var count = 0;
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:sugar_cane")
        {
            count++;
        }
    }
    return count;
}
function dumpSeeds()
{
  p.lookAt(0, 8);
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
function farmLines()
{
    // Assumes you are already in position.
    
    var x = xEast - line + 0.2;
    
    while (true) 
    {        
        // Eat
        eatFood();
            
        // Get potato
        getItemInHotbar(crop);
  
        // Farm line
        farmLine();
             
        // Move one
        x -= 3; //:eyes:?
        var newLine = line + 1;
		//Chat.log(`WE SHOULD STOP MOVING ANYWAY BUT newLine = ${newLine}`);
        if (newLine == newLineStop)
        {
        
            KeyBind.keyBind("key.forward", false);
            KeyBind.keyBind("key.attack", false);
            end();
            Client.waitTick(220);
        }
            
        Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
        //FIX THIS FIX THIS FIX THIS 
        KeyBind.keyBind("key.left", true); //Link2006: IS THIS MEANT TO BE key.right? 
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
		//FIX THIS FIX THIS FIX THIS 
        KeyBind.keyBind("key.left", false); //Link2006: IS THIS MEANT TO BE key.left? || FIXED As of 1.2
        Client.waitTick();
		//Link2006: Resync system, Poor code but works better than being offsync.
		//Link2006: This may not be needed now but i've written it just in case >:| 
		Chat.log("Repositioning ourselves...")
		p.lookAt(0, 0);
		Client.waitTick(10);
		KeyBind.keyBind("key.forward", true);
		Client.waitTick(5);
		KeyBind.keyBind("key.forward", false);
        KeyBind.keyBind("key.left", true);
		Client.waitTick(5);
        KeyBind.keyBind("key.left", false); 
		Client.waitTick(5);
		KeyBind.keyBind("key.back", true);
		Client.waitTick(10);
		KeyBind.keyBind("key.back", false);
		Chat.log("Done, Resuming...");
    }
}
function end()
{
	if(doLogout)
	{
		Chat.log("Job is finished. Now logging out."); //Link2006: fixed duplicate word in "logging out"
		Chat.log("Note that you will have extra sugarcane when you log back on."); //Link2006: Well, sure...
		Chat.say("/logout");
	}
	else
	{
		Chat.log("Job is finished, Thank you for your time."); //Link2006: Let's be polite :)
		Chat.log("Please drop your extra sugarcane in the collector before leaving.");
	}
}
// Execution

farmLines();
