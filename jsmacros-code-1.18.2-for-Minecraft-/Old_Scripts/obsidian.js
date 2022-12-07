/*
MechanicalRift's Obisdian Bot 2.1.4
What it do: The Script automatically places string in a generator and breaks the obby that is generated
Modifications:
BUGS:
requirements: the Obby_Grinder Schematic for litematica
Pickaxe must be in the first hotbar slot
*/
const food="minecraft:baked_potato"; //what the food is
const foodlevel=5; //the amount of hunger the food gives. Set to 0 if you want the player to eat imediately after losing .5 of a bar of

const player=Player.getPlayer();

/*
what type of pickaxe you are using:
diamond pick: "minecraft:diamond_pickaxe"
netherite pick: "minecraft:netherite_pickaxe"
*/
const pickaxe="minecraft:diamond_pickaxe";

//want the bot to msg you when your main account are out of string? switch the false to true and change the username
const msgcheck=false;
const username="Username Here";

//if you want your bot to leave when there is no string left
const leavecheck=true;

const pickaxeenchantment="de4";

/*
You are gonna need to change this manually
the List:
de3: Diamond Eff3
de4: Diamond Eff4
de5: Diamond Eff5
ne3: Netherite Eff3
ne4: Netherite Eff4
ne5: Netherite Eff5
The durability depends on what you are using
Diamond Pick Durability: 1544
Netherite Durability: 2014
*/

const durability=1544

//do not change this
let pickstringcheck=true;

function InvCheck()//checks inventory for string
{
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(20);
    const inv = Player.openInventory();
    var count = 0;
    for (let x = 0; x < 90; ++x)
    {
        if (inv.getSlot(x).getItemID() === "minecraft:string") 
        {
            count++;//checks both inventories for string
        }
    }
    inv.close();
    Client.waitTick();
    if(count>0)//if false ends the script
    {
        return true;
    }
    else
    {
        return false;
    }


}

function EatFood()//only eats at the most optimal
{
    player.lookAt(0, -90);
    Client.waitTick();
    const inv = Player.openInventory();
    inv.setSelectedHotbarSlotIndex(1);
    KeyBind.keyBind("key.use", true);
    while (true) 
    {
        if (player.getFoodLevel() > 20-foodlevel)
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

function Deposit()//deposits all the obby and cobble into the storage chest. generally the hopper minecarts would have collected them but you may collect a stack or two
{
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(20);
    const inv = Player.openInventory();
    Client.waitTick(20);
    for(let x=54;x<90;x++){
        if ((inv.getSlot(x).getItemID() == "minecraft:obsidian")||(inv.getSlot(x).getItemID() == "minecraft:cobblestone"))//true if the player inventory slot has obby or cobble
        {
            //Chat.log(x);
            inv.quick(x);
            Client.waitTick();
        }
        Client.waitTick();
    }
    inv.close();
}

function Obtain()//gets string from the string chest if there is none in either inventories the script ends
{
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(2);
    const inv = Player.openInventory();
    for(let x=0,y=0;y<32&&x<54;x++){
        if (inv.getSlot(x).getItemID() == "minecraft:string")//if true plyaer gets string
        {
            //Chat.log(x);
            inv.quick(x);
            Client.waitTick();
            y++;//y is for when the player gets string and is to allow the player to have 2 empty slots for collecting cobble or obby
        }
        Client.waitTick();
    }
    inv.close();
    Client.waitTick();
}

function ObbyChest()//calls deposit and string chest functions
{
    Chat.log("Storing Obsidian");
    player.lookAt(45, 0);
    Client.waitTick();
    Deposit();
    StringChest();
}

function StringChest()//calls obtain to get string. and invcheck for boolean
{
    Chat.log("Getting String");
    player.lookAt(-90, -45);
    Client.waitTick();
    Obtain();
    Chat.log("Checking amount of string");
    if(InvCheck())//if true goes to main. if false the script can:
                                        //if msgcheck is true: messages a player
                                        //if leave check is true: logs out the bot
                                        //if neither are true the script ends its own the bot will afk
    {
        main();
    }
    else{
        Chat.log("NO STRING LEFT");
        pickstringcheck=false;
        if(msgcheck)
        {
            Chat.say("/msg "+username+ " Obby Bot has ended!");
        }
        if(leavecheck)
        {
            Chat.say("/logout");
        }
    }
}

function FoodChest()//moves food to 2nd slot from a chest
{
    Chat.log("Getting Food");
    player.lookAt(0, -45);
    Client.waitTick();
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(2);
    const inv = Player.openInventory();
    for(let x=0;x<54;x++){
        if (inv.getSlot(x).getItemID() == food)//if true food goes to 2nd hotbar slot
        {
            //Chat.log(x);
            inv.swap(x,82);
            Client.waitTick();
            break;
        }
        Client.waitTick();
    }
    inv.close();
    Client.waitTick();

}

function PickaxeSwap()//swaps a pickaxe that is near breaking. the pick swap happens before 10 durability is hit
{
    Chat.log("Swapping Pickaxes");
    Client.waitTick(5);
    player.lookAt(-145, 0);
    Client.waitTick();
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(10);
    const inv = Player.openInventory();
    let i=0;
    for (; i < 54; i++)//loops until a pickaxe is swapped or the loop is ended
    {
        if ((inv.getSlot(i).getItemID() == pickaxe)&&(Player.openInventory().getSlot(i).getDamage()<durability))
        {
            inv.swap(i,81);
            break;
        }
    }
    if(i>=54){//if the for loop ended when i wasn't less than 54 the script will end because there was no picks detected
        Chat.log("NO PICKS LEFT");
        pickstringcheck=false;
        if(msgcheck)
        {
            Chat.say("/msg "+username+ " Obby Bot has ended!");
        }
        if(leavecheck)
        {
            Chat.say("/logout");
        }
    }
    inv.close();
}

/*
https://discord.com/channels/732004268948586545/745273698428387389/880942114681270273
Thanks to the wonderful people at the jsmacro discord for giving this function
This fixes the issues where if you tab out the client only clicks once
*/
function grabMouse() {
    // Client Class
    let minecraftClass = Reflection.getClass("net.minecraft.class_310");

    // Mouse Handler Field
    let mouseHandlerField = Reflection.getDeclaredField(minecraftClass, "field_1729");
    mouseHandlerField.setAccessible(true);

    //Use reflection to grab mouse:
    let clientInstance = Client.getMinecraft();

    // Mouse Handler
    let mouseHandlerObj = mouseHandlerField.get(clientInstance);

    // Mouse Handelr Class
    let mouseClass = Reflection.getClass("net.minecraft.class_312");

    // Lock Mouse / grab Mouse Boolean Field
    let lockMouse = Reflection.getDeclaredField(mouseClass, "field_1783");
    lockMouse.setAccessible(true);

    // Grab mouse
    lockMouse.setBoolean(mouseHandlerObj, true);
}

function breakBlock()//breaks according to what pick the user has defined
{
    if(pickaxeenchantment=="de3")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(90);
        KeyBind.keyBind("key.attack", false);
    }

    else if(pickaxeenchantment=="de4")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(70);
        KeyBind.keyBind("key.attack", false);
    }
    else if(pickaxeenchantment=="de5")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(50);
        KeyBind.keyBind("key.attack", false);
    }
    else if(pickaxeenchantment=="ne3")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(85);
        KeyBind.keyBind("key.attack", false);
    } 
    else if(pickaxeenchantment=="ne4")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(65);
        KeyBind.keyBind("key.attack", false);
    } 
    else if(pickaxeenchantment=="ne5")
    {
        grabMouse();
        KeyBind.keyBind("key.attack", true);
        Client.waitTick(50);
        KeyBind.keyBind("key.attack", false);
    }
}

function obbywalk()//walks around the grinder and uses the break function to break the obby
{
    const inv = Player.openInventory();
    inv.setSelectedHotbarSlotIndex(0);
    player.lookAt(-90, 0);
    KeyBind.keyBind("key.right",true);
    Client.waitTick(15);
    KeyBind.keyBind("key.right",false);
    breakBlock();
    for(let x=0;x<3;x++){
        KeyBind.keyBind("key.right",true);
        Client.waitTick(5);
        KeyBind.keyBind("key.right",false);
        breakBlock();
    }
    KeyBind.keyBind("key.right",true);
    Client.waitTick(15);
    KeyBind.keyBind("key.right",false);
    player.lookAt(180, 0);
    KeyBind.keyBind("key.right",true);
    Client.waitTick(10);
    KeyBind.keyBind("key.right",false);
    for(let x=0;x<4;x++){
        KeyBind.keyBind("key.right",true);
        Client.waitTick(5);
        KeyBind.keyBind("key.right",false);
        breakBlock();
    }
    KeyBind.keyBind("key.right",true);
    Client.waitTick(15);
    KeyBind.keyBind("key.right",false);
    player.lookAt(90, 0);
    KeyBind.keyBind("key.right",true);
    Client.waitTick(10);
    KeyBind.keyBind("key.right",false);
    for(let x=0;x<4;x++){
        KeyBind.keyBind("key.right",true);
        Client.waitTick(5);
        KeyBind.keyBind("key.right",false);
        breakBlock();
    }
    KeyBind.keyBind("key.right",true);
    Client.waitTick(15);
    KeyBind.keyBind("key.right",false);
    player.lookAt(0, 0);
    KeyBind.keyBind("key.right",true);
    Client.waitTick(10);
    KeyBind.keyBind("key.right",false);
    for(let x=0;x<4;x++){
        KeyBind.keyBind("key.right",true);
        Client.waitTick(5);
        KeyBind.keyBind("key.right",false);
        breakBlock();
    }
    KeyBind.keyBind("key.right",true);
    Client.waitTick(15);
    KeyBind.keyBind("key.right",false);

}

function stringwalk()//places string around the obby grinder
{
    const inv = Player.openInventory();
    inv.setSelectedHotbarSlotIndex(2);
    player.lookAt(-90, 30);
    KeyBind.keyBind("key.right",true);
    KeyBind.key("key.mouse.right",true);
    Client.waitTick(45);
    player.lookAt(180, 30);
    Client.waitTick(45);
    player.lookAt(90, 30);
    Client.waitTick(45);
    player.lookAt(0, 30);
    Client.waitTick(45);
    KeyBind.keyBind("key.right",false);
    KeyBind.key("key.mouse.right",false);
}

function main()//main function that is called at the start of the script
{
    const inv = Player.openInventory();
    //let lapcounter=0;
    while (pickstringcheck)//this while makes the script continue until pick or string check causes logout
    {
        //lapcounter++;
        //Chat.log("lap:"+lapcounter);
        let check=false;
        Client.waitTick();
        if (player.getFoodLevel() > 20-foodlevel||(!(inv.getSlot(37).getItemID()==food)))//detects if the player needs to eat or get more food
        {
            if(!(inv.getSlot(37).getItemID()==food)){
               FoodChest();
            }
            EatFood();
        }
        Client.waitTick();
        if(!(Player.openInventory().getSlot(36).getDamage()<durability))//detects if the player needs to swap pickaxes
        {
            PickaxeSwap();
            if(!pickstringcheck)//breaks while-loop if there are no pickaxes. semi-useless.
            {
                break;
            }
        }
        Client.waitTick();
        if(!(inv.getSlot(38).getItemID()=="minecraft:string"))//moves the string to the 3rd slot on hotbar
        {
            for(let x=9;x<45;x++)
            {
            
                if (inv.getSlot(x).getItemID() == "minecraft:string")
                {
                   check=false;
                   inv.openGui();
                   Client.waitTick(); 
                   inv.swap(x,38)
                   break;
                }
                else
                {
                    check=true;
                }
            }
            inv.close();
        }
        Client.waitTick();
        if(check){
            ObbyChest();
            if(!pickstringcheck)//breaks while-loop if there are no string. semi-useless.
            {
                break;
            }
        }
        Client.waitTick();
        if(pickstringcheck)//if true stringwalk and obbywalk will run. semi-useless.
        {
            stringwalk();
            player.lookAt(-45.5,-10.5);
            KeyBind.key("key.mouse.right", true);
            Client.waitTick(10);
            KeyBind.key("key.mouse.right", false);
            Client.waitTick(20);
            obbywalk();
        }
    }
}
//exe
main();