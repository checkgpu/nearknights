items = [
%{name: "Dagger", id: 100, texture: "Dagger_01", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 2,
    attack_speed: 160, rarity: "common"},
%{name: "Goblin Shiv", id: 200, texture: "Dagger_03", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 3,
    attack_speed: 160, rarity: "common"},
%{name: "Silver Dagger", id: 300, texture: "Dagger_06", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 3, 
    undead_dice: 1, undead_dice_sides: 20, attack_speed: 160, rarity: "common"},

%{name: "Gladius", id: 400, texture: "Sword_03", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 6, rarity: "common"},
%{name: "Silver Sword", id: 500, texture: "Sword_17", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 8, 
    undead_dice: 1, undead_dice_sides: 20, rarity: "common"},
%{name: "Katana", id: 600, texture: "Sword_20", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 12, hit: 1, rarity: "uncommon"},

%{name: "Orcish Axe", id: 700, texture: "Axe_03", slot: "weapon", weapon_dice: 1, weapon_dice_sides: 16, attack_speed: -500, rarity: "common"},

%{name: "Wooden Shield", id: 10000, texture: "shield_01", slot: "shield", ac: 1, rarity: "common"},
%{name: "Iron Plated Shield", id: 10100, texture: "shield_04", slot: "shield", ac: 2, rarity: "common"},
%{name: "Iron Shield", id: 10200, texture: "shield_16", slot: "shield", ac: 3, rarity: "uncommon"},

%{name: "Goblin Ring Mail", id: 20000, texture: "Chest_18", slot: "body", ac: 2, rarity: "common"},
%{name: "Orcish Ring Mail", id: 20100, texture: "Chest_19", slot: "body", ac: 3, rarity: "common"},
%{name: "Russet Armor", id: 20200, texture: "Chest_36", slot: "body", ac: 4, rarity: "common"},
%{name: "Platemail", id: 20300, texture: "Chest_71", slot: "body", ac: 6, rarity: "uncommon"},

%{name: "Shirt", id: 30000, texture: "Chest_01", slot: "shirt", ac: 0, rarity: "common"},
%{name: "Shirt of Strength", id: 30100, texture: "Chest_06", slot: "shirt", ac: 0, str: 1, rarity: "uncommon"},
%{name: "Shirt of Power", id: 30200, texture: "Chest_11", slot: "shirt", ac: 1, str: 1, damage: 1, rarity: "rare"},

%{name: "Leather Gloves", id: 40000, texture: "Gloves_01", slot: "gloves", ac: 0, rarity: "common"},
%{name: "Iron Gloves", id: 40100, texture: "Gloves_07", slot: "gloves", ac: 1, rarity: "common"},
%{name: "Wristwraps", id: 40200, texture: "Gloves_18", slot: "gloves", ac: 0, hit: 1, er: 1, rarity: "common"},
%{name: "Death Knight Gloves", id: 40300, texture: "12_Mail_gloves", slot: "gloves", ac: 4, damage: 2, attack_speed: 60, rarity: "legendary"},

%{name: "Leather Boots", id: 50000, texture: "Boots_04", slot: "boots", ac: 1, rarity: "common"},
%{name: "Iron Boots", id: 50100, texture: "Boots_11", slot: "boots", ac: 2, rarity: "common"},

%{name: "Iron Cap", id: 60000, texture: "Helm_06", slot: "head", ac: 1, rarity: "common"},
%{name: "Iron Helmet", id: 60100, texture: "Helm_01", slot: "head", ac: 2, rarity: "common"},

%{name: "Cloak of Magic Resistance", id: 70000, texture: "Back_14", slot: "cloak", ac: 1, mr: 6, rarity: "uncommon"},
%{name: "Cloak of Protection",id: 70100,  texture: "Back_15", slot: "cloak", ac: 2, rarity: "uncommon"},

%{name: "Leather Pants", id: 80000, texture: "Pants_08", slot: "legs", ac: 1, rarity: "common"},
%{name: "Iron Pants", id: 80100, texture: "Pants_14", slot: "legs", ac: 2, rarity: "common"},
%{name: "Magic Resistant Pants", id: 80200, texture: "Pants_18", slot: "legs", ac: 2, mr: 3, rarity: "uncommon"},

%{name: "Strength Amulet", id: 90000, texture: "necklace_14", slot: "neck", str: 1, rarity: "uncommon"},
%{name: "Dexterity Amulet", id: 90100, texture: "necklace_15", slot: "neck", dex: 1, rarity: "uncommon"},
%{name: "Intelligence Amulet", id: 90200, texture: "necklace_17", slot: "neck", int: 1, rarity: "uncommon"},

%{name: "Ring of Health", id: 100_000, texture: "Ring_04", slot: "ring", hp_regen: 2, rarity: "common"},
%{name: "Ring of Mana", id: 100_100, texture: "Ring_05", slot: "ring", mp_regen: 1, rarity: "common"},

%{name: "Enchant Gear Rune", id: 1_000_000, texture: "Enchantment_47_rune_stoune", rarity: "uncommon"},
%{name: "Blessed Enchant Gear Rune", id: 1_000_100, texture: "Enchantment_48_rune_stoune", rarity: "uncommon"},

%{name: "Codex: Reflexes", id: 2_000_000, texture: "Book_1", rarity: "common"},
%{name: "Codex: Power", id: 2_000_100, texture: "Book_2", rarity: "common"},
%{name: "Codex: Meditation", id: 2_000_200, texture: "Book_10", rarity: "common"},
%{name: "Spellbook: Bless Weapon", id: 2_000_300, texture: "Book_22", rarity: "uncommon"},
%{name: "Spellbook: Iron Skin", id: 2_000_400, texture: "Book_5", rarity: "rare"},

%{name: "Hero Gacha", id: 6_000_000, texture: "Blacksmith_13_leather_patch", rarity: "uncommon"},
%{name: "Hero Gacha Premium", id: 6_000_100, texture: "Blacksmith_19_flake_patch", rarity: "rare"},
%{name: "Hero Gacha Epic", id: 6_000_200, texture: "Blacksmith_20_rune_patch", rarity: "epic"},
]

items_bin = Enum.reduce(items, "", fn(item, acc)->
    var = "item_#{item.id}"
    acc = acc <> "var #{var} = new Item(#{item.id});\n"
    acc <> Enum.reduce(item, "", fn({k,v},acc)->
        cond do
            k in [:rarity] -> acc
            is_binary(v) ->
                acc <> "#{var}.#{k}=\"#{v}\"; "
            true ->
                acc <> "#{var}.#{k}=#{v}; "
        end
    end) <> "\n"
end)

items_map_bin = Enum.reduce(items, "", fn(item, acc)->
    var = "item_#{item.id}"
    acc <> "items.set(#{item.id}, #{var})\n"
end)

#These go into smart contract
IO.puts """
#{items_bin}
const items = new Map<u64, Item>()
#{items_map_bin}
"""

## These go into frontend items.js loader
item_loader_bin = Enum.reduce(items, "", fn(item, acc)->
    acc <> "scene.load.image('#{item.texture}', '/assets/battler/items/#{item.texture}.png')\n"
end)
IO.puts item_loader_bin

## The go into frontend items.js
item_obj_bin = Enum.reduce(items, "", fn(item, acc)->
    props = Enum.reduce(item, "", fn({k,v}, acc)->
        cond do
            is_binary(v) ->
                acc <> "#{k}: \"#{v}\", "
            true ->
                acc <> "#{k}: #{v}, "
        end
    end) |> String.trim(", ")
    acc <> "  #{item.id}: {#{props}},\n"
end) |> String.trim()
IO.puts """
export const ITEMS = {
  #{item_obj_bin}
}
"""