---
ns: CFX
apiset: shared
---
## CANCEL_EVENT

```c
void CANCEL_EVENT();
```

Cancels the currently executing event.

## Examples
```lua
AddEventHandler("playerConnecting", function(name, setKickReason, deferrals)
    local src = source
    
    -- Call a function to check if a player is banned and check the boolean return
    if IsPlayerBanned(src) then
        -- If the player is banned cancel the event
        CancelEvent()
    end

end)
```

```cs
[EventHandler("playerConnecting")]
internal void OnEventPlayerConnecting([FromSource] Player source, string playerName, dynamic setKickReason, dynamic deferrals) 
{
    // Call a function to check if a player is banned and check the boolean return
    if (IsPlayerBanned(source)) 
    {
        // If the player is banned cancel the event
        CancelEvent();
    }
}
```