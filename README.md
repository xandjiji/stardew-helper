# Stardew Helper

This application is 100% free and open-source. Run it in any device through a web-browser! Designed for both Mobile and Desktop.

You can find the application [here](https://xandjiji.github.io/stardew-helper/).

<p align="center">
	<img src="https://i.imgur.com/YnNudYz.png">
</p>

## Features

- Community checklist (sorting items by Season or by Community Center room)
- Detailed information for more than 1,000 items, separated by categories!
- Calendar just like in the game
- NPC location tool
- In-depth information for all NPCs
- Item search mode
- 7 Different visual Themes
- Import/export data (so you can share your community checklist with your friends in multiplayer)

<p align="center">
	<img src="https://i.imgur.com/EbvmGKa.png">
</p>

## Game Data

All the game data used in this app was either scrapped from the [Stardew Valley Wiki](https://stardewvalleywiki.com/Stardew_Valley_Wiki) or from the original game files.

`stardew-helper/src/jsons` [Link](https://github.com/xandjiji/stardew-helper/tree/master/src/jsons)

`stardew-helper/src/assets` [Link](https://github.com/xandjiji/stardew-helper/tree/master/src/assets)

Stardew Valley has a huge variety of data for every game object. The data in this project was modeled in a very heterogeneous format. Here is a sample:

```javascript
{
  id: 690,
	name: "Refined Quartz",
	link: "Refined_Quartz",
	sellPrice: "50",
	obtainedFrom: [
		"@Smelting (&617~ or &620~)",
		"@Using a &740~ or a &741~ in a &154~"
	],
	makes: [138, 94, 93, 144, 152, "Necklace Shirt"],
	recipe: [
		{ id: 60, qty: 1 },
		{ id: 0, qty: 1 }
	],
	gifting: {
		dislikes: [982, 983],
		hates: [1008]
	}
}
```

Strings that starts with an `@` indicates that it contains a reference for another game object by its ID. The object's ID is wrapped between `&` and `~` symbols to help the parsing of the data.

`@Using a &740~ or a &741~ in a &154~"`

Gets parsed as:

`Using a Broken CD or a Broken Glasses in a Recycling Machine"`

## More informations

This project was done using [React.js](https://reactjs.org/) and [Redux](https://reactjs.org/).
In the future, a native mobile version for this App will be developed (most likely using React Native)

If you have any suggestions, questions or need any help, feel free to contact me :-)
