function dump()
{
const inv = Player.openInventory();
    for (let i = 9; i < 36; i++)
    {
        inv.click(i);
        Client.waitTick();
        inv.click(-999);
        Client.waitTick();
    }
}
dump();