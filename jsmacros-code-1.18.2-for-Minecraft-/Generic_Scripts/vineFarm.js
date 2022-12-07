// ELYSIUM VINES BOT
// CAP YOUR FPS WHEN RUNNING, IT FUCKS UP DURING FRAMERATE DROPS
// FARM DIMENSIONS: KEEP IN MIND THIS IS AN WEST-EAST BOT
const startx = -1169.5
const startz = -5313.5

const endx = -1085.5
const endz = -5293.5
const breakAngles = [0, 45, 55]

// ITEM IDS
const tool = "minecraft:shears" 
const crop = "minecraft:vine" // the item you would like to farm, could also replace this with pumpkin


// PROGRAM, TOUCH IF YOU ARE FAMILIAR WITH JS

// UNCOMMENTED ORANGE CODE LMAO
function dropoff(x, z) {

    walkTo(x, z)
    Time.sleep(500)
    Player.getPlayer().lookAt(180, 45)
    Time.sleep(500)
    
    let inv = Player.openInventory()

    while (pick(crop, 2, -35)) {
        // If you hold Y it will stop running
        for (let i = 0; i < KeyBind.getPressedKeys().length; i++) {
            if (KeyBind.getPressedKeys()[i] === "key.keyboard.y") {
               flag = true
               throw('Cancel')
            }
        }
        Time.sleep(100)
        Player.getPlayer().getRaw().method_7290(true)
        Time.sleep(100)
    }
    inv.closeAndDrop()

}
function pick(name, hotbar, dmg) {
    let inv = Player.openInventory()
    let slots = inv.getMap()

    if (hotbar == null) {
        hotbar = inv.getSelectedHotbarSlotIndex()
    }

    let slot = slots["hotbar"][inv.getSelectedHotbarSlotIndex()]
    let item = inv.getSlot(slot)
    let dura = item.getMaxDamage() - item.getDamage()
    if (item.getItemID() === name && (dmg===-1 || dura>dmg)) {
        inv.close()
        return true
    }
    
    for (let i = 0; i < 9; i++) {
        let slot = slots["hotbar"][i]
        let item = inv.getSlot(slot)
        let dura = item.getMaxDamage() - item.getDamage()
        if (item.getItemID() === name && (dmg==-1 || dura>dmg)) {
            inv.setSelectedHotbarSlotIndex(i)
            inv.close()
            return true
        }
    }
    for (let slot in slots["main"]) {
        item = inv.getSlot(slot)
        dura = item.getMaxDamage() - item.getDamage()
        if (item.getItemID() === name && (dmg===-1 || dura>dmg)) {
            inv.swap(slot, slots["hotbar"][hotbar])
            Time.sleep(250)
            inv.setSelectedHotbarSlotIndex(hotbar)
            inv.close()
            return true
        }
    }
    inv.close()
    return false
}


function walkTo(x, z, precise, timeout) { 
    let position = Player.getPlayer().getPos()
    if (x == null) {
        tx = position.x
    }
    if (z == null) {
        tz = position.z
    }
    if (precise) {
        tx = x
        tz = z
    } else {
        if (position.x < 0) {
            tx = Math.round(x)-0.5
        } else {
            tx = Math.round(x)+0.5
        }

        if (position.z < 0) {
            tz =Math.round(z)-0.5
        } else {
            tz = Math.round(z)+0.5
        }
    }

    //Chat.log("walking to " + x + ", " + z);

    KeyBind.key("key.keyboard.w", true);
    let timer = 0;
    let flag = false
    while (true) {
        Client.waitTick();
        if (flag) { break }
        for (let i = 0; i < KeyBind.getPressedKeys().length; i++) {
            if (KeyBind.getPressedKeys()[i] === "key.keyboard.y") {
               flag = true
            }
        }

        timer += 1;
        let yaw = position.y
        if (Math.abs(position.x - tx) < 0.5 && Math.abs(position.z - tz) < 0.5) {
            yaw = 0
        }
        Player.getPlayer().lookAt(tx, yaw, tz);
        position = Player.getPlayer().getPos();
        if (Math.abs(position.x - tx) < 0.5 && Math.abs(position.z - tz) < 0.5) {
            KeyBind.key("key.keyboard.left.shift", true);
        }
        if (Math.abs(position.x - tx) < 0.075 && Math.abs(position.z - tz) < 0.075) {
            break
        }
        if (timeout && timer > timeout) {
            Chat.log("walkTo timed out");
            KeyBind.key("key.keyboard.w", false);
            KeyBind.key("key.keyboard.left.shift", false);
            return false
        }
        
    }
    KeyBind.key("key.keyboard.w", false);
    KeyBind.key("key.keyboard.left.shift", false);
    Client.waitTick()
    position= Player.getPlayer().getPos();
    Player.getPlayer().getRaw().method_5814(tx,position.y,tz);
}

var vineBreakTime = 600
// uncommented orange code has ended
for (cz = startz; cz <= endz; cz += 5) {
    
    walkTo(startx, cz)
    // If you hold Y it will stop running
    for (cx = startx; cx <= endx; cx++) {
         // If you hold Y it will stop running
         for (let i = 0; i < KeyBind.getPressedKeys().length; i++) {
            if (KeyBind.getPressedKeys()[i] === "key.keyboard.y") {
               flag = true
               throw('Cancel')
            }
        }

        walkTo(cx, cz)
        Client.waitTick(10)
        // (left) melons?
    
        for (j = 0; j < breakAngles.length; j++) {
            breakAngle = breakAngles[j]

            Player.getPlayer().lookAt(0, breakAngle)
            pick(tool, 1, -1)
            KeyBind.key("key.mouse.left", true)
            Time.sleep(vineBreakTime)
            KeyBind.key("key.mouse.left", false)
            for (let i = 0; i < KeyBind.getPressedKeys().length; i++) {
                if (KeyBind.getPressedKeys()[i] === "key.keyboard.y") {
                flag = true
                throw('Cancel')
                }
            }
            // (RIGHT) melons?
            Client.waitTick(10)
            Player.getPlayer().lookAt(180, breakAngle)
            pick(tool, 1, -1)
            KeyBind.key("key.mouse.left", true)
            Time.sleep(vineBreakTime)
            KeyBind.key("key.mouse.left", false)
        }   
    }
    dropoff(endx, cz)
    walkTo(startx, cz)
}