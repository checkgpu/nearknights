mobs = [
%{id: 1, name: "Goblin Grunt", texture: "Goblin Grunt", level: 2, hit: 1, ac: 6, exp: 5, hp: 18, rarity: "common", drop_table: [
    #%{id: 200, chance: 3_500}, #goblin skull
    %{id: 200, chance: 2_200}, #goblin shiv
    %{id: 10_000, chance: 1_500}, #wooden shield
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 2, name: "Goblin Archer", texture: "Goblin Archer", level: 4, hit: 2, ac: 8, exp: 8, hp: 28, preemptive: 1, ranged: 1, rarity: "common", drop_table: [
    #%{id: 200, chance: 3_500}, #goblin skull
    %{id: 20_000, chance: 1_500}, #Goblin Ring Mail
    %{id: 40200, chance: 450}, #wristwraps
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 3, name: "Goblin Spear", texture: "Kobolds Spear Kobold", level: 4, hit: 2, ac: 8, exp: 8, hp: 28, preemptive: 1, rarity: "common", drop_table: [
    %{id: 20_000, chance: 1_600}, #Goblin Ring Mail
    %{id: 60_000, chance: 1_500}, #iron cap
    %{id: 10_000, chance: 500}, #wooden shield
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 4, name: "Goblin Elite", texture: "Goblin Elite", level: 8, hit: 3, exp: 16, ac: 9, hp: 56, dr: 1, rarity: "uncommon", drop_table: [
    %{id: 400, chance: 1_600}, #Gladius
    %{id: 70_100, chance: 900}, #Cloak of Protection
    %{id: 1_000_000, chance: 120}, #Enchant Gear Rune
    %{id: 100_000, chance: 20}, #ring of health
    %{id: 40_300, chance: 1}, #Death Knight Gloves
]},
%{id: 5, name: "Goblin Mage", texture: "Goblin Mage", level: 6, hit: 5, exp: 16, ac: 7, hp: 34, rarity: "uncommon", drop_table: [
    %{id: 70_000, chance: 450}, #Cloak of Magic Resistance
    %{id: 90_200, chance: 300}, #Intelligence Amulet
    %{id: 1_000_000, chance: 240}, #Enchant Gear Rune
    %{id: 100_100, chance: 20}, #ring of mana
    %{id: 1_000_100, chance: 1}, #Blessed encahnt
    %{id: 40_300, chance: 1}, #Death Knight Gloves
]},

%{id: 10, name: "Orc Sword Warrior", texture: "Orc Sword Warrior", level: 7, exp: 16, ac: 12, hp: 56, rarity: "common", drop_table: [
    %{id: 20_100, chance: 900}, #Orcish Ring Mail
    %{id: 500, chance: 460}, #Silver Sword
    %{id: 80_100, chance: 350}, #Iron Pants
    %{id: 90_100, chance: 11}, #Strength Amulet
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 11, name: "Orc Axe Warrior", texture: "Orc Axe Warrior", level: 8, exp: 18, ac: 12, dr: 1, hp: 66, rarity: "common", drop_table: [
    %{id: 20_100, chance: 900}, #Orcish Ring Mail
    %{id: 700, chance: 450}, #Orcish Axe
    %{id: 90_100, chance: 11}, #Strength Amulet
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 12, name: "Orc Archer", texture: "Orc Archer", level: 9, hit: 2, exp: 20, ac: 10, hp: 46, preemptive: 1, ranged: 1, rarity: "common", drop_table: [
    %{id: 80000, chance: 900}, #Leather Pants
    %{id: 50000, chance: 900}, #Leather Boots
    %{id: 90_100, chance: 11}, #Dexterity Amulet
    %{id: 100_000, chance: 10}, #ring of health
]},
%{id: 13, name: "Orc Warlock", texture: "Orc Warlock", level: 11, hit: 6, exp: 48, ac: 15, hp: 84, rarity: "uncommon", drop_table: [
    %{id: 30_100, chance: 600}, #Shirt of Strength
    %{id: 70_000, chance: 600}, #Cloak of Magic Resistance
    %{id: 90_200, chance: 460}, #Intelligence Amulet
    %{id: 1_000_000, chance: 290}, #Enchant Gear Rune
    %{id: 100_100, chance: 40}, #ring of mana
    %{id: 1_000_100, chance: 1}, #Blessed encahnt
    %{id: 40_300, chance: 1}, #Death Knight Gloves
]},
]

mobs = Enum.map(mobs, fn(mob)->
    v = Enum.reduce(Enum.sort_by(mob.drop_table, & &1.chance), "", fn(drop, acc)->
        acc <> "new IndexChance(#{drop.id}, #{drop.chance}),"
    end)
    |> String.trim(",")
    Map.put(mob, :drop_table, v)
end)

mobs_bin = Enum.reduce(mobs, "", fn(mob, acc)->
    var = "mob_#{mob.id}"
    acc = acc <> "var #{var} = new Monster(#{mob.id});\n"
    acc <> Enum.reduce(mob, "", fn({k,v},acc)->
        cond do
            k in [:name, :texture, :rarity] -> acc
            k == :drop_table ->
                acc <> "#{var}.#{k}=[#{v}]; "
            is_binary(v) ->
                acc <> "#{var}.#{k}=\"#{v}\"; "
            true ->
                acc <> "#{var}.#{k}=#{v}; "
        end
    end) <> "\n"
end)

mobs_map_bin = Enum.reduce(mobs, "", fn(mob, acc)->
    var = "mob_#{mob.id}"
    acc <> "mobs.set(#{mob.id}, #{var})\n"
end)

IO.puts """
#{mobs_bin}
const mobs = new Map<u64, Monster>()
#{mobs_map_bin}
"""
