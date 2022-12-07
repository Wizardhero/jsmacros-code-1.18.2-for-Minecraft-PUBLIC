// HuM4nB31nG's Crop Bot
// Used for any of the major crop farms (potato, wheat, carrot, beet)

// Make sure that you have a rectangular farm, you have the food you want to eat in the hotbar,
// And that you have room in your hotbar for whatever item you need to replant.

// Set to the boundaries of your farm
const xEast = -55;
const xWest = -68;
const zNorth = 128;
const zSouth = 141;

const crop = "Potato" // Set to "Potato" or "Seeds" or "Carrot"
const food = "Bread" // Set to whatever food you are eating

const p = Player.getPlayer();

function farmLine() {
    // Start at south, harvest to north, move back and click
    p.lookAt(90, 90);
    
    // Move west and harvest!
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
    
    while (true) {
        if (p.getPos().x <= xWest) {
            break;
        } else {
            Client.waitTick()
        }
    }
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
    
    // Move east and farm.
    KeyBind.keyBind("key.back", true);
    KeyBind.keyBind("key.use", true);
    
    while (true) {
        if (p.getPos().x >= xEast + 0.5) {
            break;
        } else {
            Client.waitTick();
        }
    }
   
    KeyBind.keyBind("key.back", false);
    KeyBind.keyBind("key.use", false);
}

function eatFood() {
    getItemInHotbar(food);
    
    KeyBind.keyBind("key.use", true);
    
    while (true) {
        if (p.getFoodLevel() >= 20) {
            break;
        } else {
            Client.waitTick();
        }
    }
    
    KeyBind.keyBind("key.use", false);
}

function getItemInHotbar(item) {
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) {
        inv.setSelectedHotbarSlotIndex(i);
        if (inv.getSlot(i+36).getName() == item) {
            break;
        }
        Client.waitTick();
    }
}
function farmLines() {
    // Assumes you are already in position.
    
    var z = zSouth + 0.5;
    
    while (true) {
        // Eat
        eatFood();
        
        // Get potato
        getItemInHotbar(crop);
        
        // Farm line
        farmLine();
        
        // Move one
        z -= 1;
        KeyBind.keyBind("key.right", true);
        while (true) {
           if (p.getPos().z <= z) {
               break;
           } else {
               Client.waitTick()
           }
        }
        KeyBind.keyBind("key.right", false);
        Client.waitTick();
    }
}

farmLines();
