---
ns: CFX
apiset: client
---
## GET_ACTIVE_PLAYERS

```c
object GET_ACTIVE_PLAYERS();
```

Returns all player indices for 'active' physical players known to the client.
The data returned adheres to the following layout:
```
[127, 42, 13, 37]
```
_NOTE: When using OneSync Infinity this will only return players inside the client's culling radius (see [OneSync Docs](https://docs.fivem.net/docs/scripting-reference/onesync/#:~:text=Player%20culling.%20No%20players%20will%20be%20created/deleted%20locally%20outside%20of%20the%20focus%20zone%20too.%20This%20means%20that%20all%20player%20iteration%20will%20have%20to%20happen%20server%2Dside))_

## Return value
An object containing a list of player indices.
