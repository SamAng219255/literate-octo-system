function treeHelp() {
	help=true;
    transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
  console.log("\"treeHelp\" done");
}
function helpTree(input) {
	if(input=="primary actions")
    {
      transceive("The primary actions are Inventory, Health, collect, hunt, attack, craft, build, cook, sleep, eat, equip, and smelt. (collect, hunt, attack, craft, build, cook, and smelt are covered under other sections and Inventory and health are combined in here.)","helpTree2");
    }
    else if(input=="collectables")
    {
      transmit("Collectables are objects you can collect. In a forest biome can collect sticks and trees if you have an axe. In a rocky biome you can collect rocks. In a swamp biome you can collect vines and reeds. In a plains biome you can collect long grass.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="hunting")
    {
      transmit("You can hunt deer as long as you have a bow and they drop hide and meat.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="attacking")
    {
      transmit("You can attack bears and snakes and later you will be able to deal more damage by crafting a sword. Bears drop two hide.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="crafting")
    {
      transmit("You can craft objects that you can't collect from that which you can collect. You can craft a sharp rock from a rock and a hard rock (the hard rock is not consumed). You can craft a cord from either long grass or reeds. You can craft an axe from a sharp rock, a stick, and either a cord or a vine. You can craft a bow from a stick and a cord. You can craft 3 arrows from a sharp rock and a stick. You can craft leather from a hide. You can craft leather armor from 5 leather.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="building")
    {
      transmit("You can build structures from objects you collect or craft. You can build a log cabin from 3 logs. You can build a campfire from two hard rocks and 3 sticks. You can build a forge using five rocks.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="cooking")
    {
      transmit("You cook using a campfire. You can cook meat into cooked meat. You can cook a log into five charcoal.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="armor")
    {
      transmit("Armor will block some points of melee damage. Leather armor blocks one point of damage.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="smelting")
    {
      transmit("Using a forge you can smelt. You can smelt a meteor into iron.");
      transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
    }
    else if(input=="exit")
    {
      receive("tree1");
  }
}
function helpTree2(input) {
	if(input=="Inventory and Health")
      {
        transmit("Type Inventory to see your inventory and type Health to see your health.");
        transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
      }
      else if(input=="sleep")
      {
        transmit("As long as you are in a space that inclues a cabin you can sleep. Sleeping restores five points of health and removes poison.");
        transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
      }
      else if(input=="eat")
      {
        transmit("You can eat food to restore health. Meat will restore two points of health and give you one turn of poison, effectively giving you one point of health. Cooked meat will restore three points of health.");
        transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
      }
      else if(input=="equip")
      {
        transmit("You can equip armor and later stuff such as rings and amulets.");
        transceive("This is the root help menu. From here you can search for assistance on: primary actions, collectables, hunting, attacking, crafting, building, cooking, armor, and smelting. Click ok at any time to return to this menu. You can also exit from here.","helpTree");
      }
}

