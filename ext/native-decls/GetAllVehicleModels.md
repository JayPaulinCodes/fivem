---
ns: CFX
apiset: client
---
## GET_ALL_VEHICLE_MODELS

```c
object GET_ALL_VEHICLE_MODELS();
```

Returns all registered vehicle model names, including non-dlc vehicles and custom vehicles in no particular order.

**Example output**

```
	["dubsta", "dubsta2", "dubsta3", "myverycoolcar", "sultan", "sultanrs", ...]
```

This native will not return vehicles that are unregistered (i.e from a resource being stopped) during runtime.

## Examples

```lua
RegisterCommand("spawnrandomcar", function()
	local vehicles = GetAllVehicleModels()
	local veh = vehicles[math.random(1, #vehicles)]
	RequestModel(veh)
	repeat Wait(0) until HasModelLoaded(veh)
	local veh = CreateVehicle(veh, GetEntityCoords(PlayerPedId()), GetEntityHeading(PlayerPedId()), true, false)
	SetPedIntoVehicle(PlayerPedId(), veh, -1)
end)
```

```cs
[Command("spawnrandomcar")]
internal void OnCommandSpawnRandomCar(int src, List<object> args, string raw) 
{
	dymanic vehicles = GetAllVehicleModels();
	Random random = new Random();
	dynamic vehicle = vehicles[random.Next(0, vehicles.Length)];

	RequestModel((uint)GetHashKey(vehicle));
	while (!HasModelLoaded((uint)GetHashKey(vehicle))) { await Delay(100); }

	CreateVehicle((uint)GetHashKey(vehicle), Game.PlayerPed.Position, Game.PlayerPed.Heading, true, false)
}
```

