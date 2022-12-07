/*
MechanicalRift's Obisdian Bot 2.1.1
What it do: The Script automatically places string in a generator and breaks the obby that is generated
Modifications:

BUGS:


*/


/* Starting Hotbar requirement
Slot 1 Slot 2 Slot 3
Pick    Food   String
*/
const food="minecraft:baked_potato"; //what the food is
const foodlevel=5; //the amount of hunger the food gives

const player=Player.getPlayer();

/*
what type of pickaxe you are using:
diamond pick: "minecraft:diamond_pickaxe"
netherite pick: "minecraft:netherite_pickaxe"
*/

//want the bot to msg you when your main account are out of string? switch the false to true and change the username
const msgcheck=false;
const username="Username Here";

//if you want your bot to leave when there is no string left
const leavecheck=true;

const pickaxe="minecraft:diamond_pickaxe";

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


let pickstringcheck=true;

function InvCheck()
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
            count++;
          }
        }
        inv.close();
        Client.waitTick();
        if(count>0)
        {
            return true;
        }
        else
        {
            return false;
        }


}


function EatFood()
{
    const inv = Player.openInventory();
    inv.setSelectedHotbarSlotIndex(1);
    
    KeyBind.keyBind("key.use", true);
    
    while (true) 
    {
        if (player.getFoodLevel() >= (20-foodlevel))
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

function Deposit(){
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(20);
    const inv = Player.openInventory();
    Client.waitTick(20);
    for(let x=54;x<90;x++){
        if ((inv.getSlot(x).getItemID() == "minecraft:obsidian")||(inv.getSlot(x).getItemID() == "minecraft:cobblestone"))
        {
            //Chat.log(x);
            inv.quick(x);
            Client.waitTick();
        }
        Client.waitTick();
    }
    inv.close();
}

function Obtain(){
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(2);
    const inv = Player.openInventory();
    for(let x=0,y=0;y<32&&x<54;x++){
        if (inv.getSlot(x).getItemID() == "minecraft:string")
        {
            //Chat.log(x);
            inv.quick(x);
            Client.waitTick();
            y++;//y++ is down here for when there are empty slots in the string chest
        }
        Client.waitTick();
    }
    inv.close();
    Client.waitTick();
}

function ObbyChest()
{
    Chat.log("Storing Obsidian");
    player.lookAt(45, 0);
    Client.waitTick();
    Deposit();
    StringChest();
}


/*starts the obtain function then starts the inventory chest function
if the inventory chest comes false the program ends
*/
function StringChest()
{
    Chat.log("Getting String");
    player.lookAt(-90, -45);
    Client.waitTick();
    Obtain();
    Chat.log("Checking amount of string");
    if(InvCheck())
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

function FoodChest()//moves food to 2nd slot
{
    Chat.log("Getting Food");
    player.lookAt(0, -45);
    Client.waitTick();
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick(2);
    const inv = Player.openInventory();
    for(let x=0;x<54;x++){
        if (inv.getSlot(x).getItemID() == food)
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

function PickaxeSwap()
{
    Chat.log("Swapping Pickaxes");
    player.lookAt(-145, 0);
    Client.waitTick();
    KeyBind.key("key.mouse.right", true);
    KeyBind.key("key.mouse.right", false);
    Client.waitTick();
    const inv = Player.openInventory();
    for (let i = 0; i < 54; i++)
    {
        if ((inv.getSlot(i).getItemID() == pickaxe)&&(inv.getSlot(i).getDamage()<durability))
        {
            inv.swap(i,81);
            break;
        }

    }
    if(i>=54){
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

function breakBlock()
{
        if(pickaxeenchantment=="de3")
        {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(90);
            KeyBind.key("key.mouse.left", false);
        }

        else if(pickaxeenchantment=="de4")//de4
       {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(70);
            KeyBind.key("key.mouse.left", false);
        }
        else if(pickaxeenchantment=="de5")//de5
        {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(50);
            KeyBind.key("key.mouse.left", false);
        }
        else if(pickaxeenchantment=="ne3")//ne4
        {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(85);
            KeyBind.key("key.mouse.left", false);
        } 
        else if(pickaxeenchantment=="ne4")//ne4
        {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(65);
            KeyBind.key("key.mouse.left", false);
        } 
        else if(pickaxeenchantment=="ne5")//ne5
        {
            KeyBind.key("key.mouse.left", true);
            Client.waitTick(50);
            KeyBind.key("key.mouse.left", false);
        }
}

function obbywalk(){
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

function stringwalk(){
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

function main(){
    const inv = Player.openInventory();
    while (pickstringcheck)
    {
        let check=false;
        Client.waitTick();
        if (player.getFoodLevel() <= (20-foodlevel)||(!(inv.getSlot(37).getItemID()==food)))
        {
            if(!(inv.getSlot(37).getItemID()==food)){
               // FoodChest();
            }
            EatFood();
        }
        Client.waitTick();
        if(!(Player.openInventory().getSlot(36).getDamage()<durability))
        {
            PickaxeSwap();
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
        }
        Client.waitTick();
        if(pickstringcheck){
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
main();