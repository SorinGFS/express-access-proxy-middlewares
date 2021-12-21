[Back to Main Page](https://github.com/SorinGFS/express-access-proxy#configuration)

### Access Control - Allow Contexts (e.g., RBAC)

This module allows `Context Based Access Control` route or even server. Think of `Role Based Access Control` as being just one of the multitude of contexts that may need management upon receiving a request.

### How It Works

In contrast to other modules, this module is not loaded anywhere in the project because of the fact that we cannot know when the context that we need to manage is created. So, when we need to manage a context we load this module in the file and use it exactly before the execution process. Of course, the module will take its configuration depending on the requested server and route, and if it finds in the config a context that matches the one existing in the request then it will allow access, otherwise it will reject access.

For simplicity let's assume the following scenario: after authentication, the following context is created:

```js
req = {
    // among other props...
    user: { role: 'admin' },
};
```

In config we have the following `allowContexts`:

```json
{
    "accessControl": {
        "allowContexts": [
            { "user": { "role": "editor" } }, 
            { "user": { "role": "admin" } }
        ]
    }
}
```

The access is permited because one of the contexts is identical with the one in request (`req`) object. No other contexts are allowed for this particular config. This was just a basic example of undestanding the structure of `allowContexts`: array of objects (contexts), context properties must be of type `object` and must exist in `req`, and each of second level object properties must be json primitive types. Also, a context is not limited to a single property, the following is valid too:

```json
{
    "accessControl": {
        "allowContexts": [
            { "user": { "role": "editor" }, "site": { "controller": "posts" } }, 
            { "user": { "role": "admin" }, "site": { "controller": "posts" } }
        ]
    }
}
```

In the second example **all** the properties in the context **must match the request!**

**Important note:** at first glance it may seem complicated to manage the multitude of contexts that can be created, but they can be generated with the help of tools based on established rules. Moreover, once the configuration is generated, it can be cached in `includes` and can be reused in multiple servers and locations.

### Configuration

To enable `Context Based Access Control` for a `server` or `location` block use `accessControl.allowContexts` directive (as an array of a single or multiple objects) like following:

**File:** `config/servers/available/my-server.json`

```json
{
    "serverName": "myDomain.com",
    "...": "...",
    "server": {
        "accessControl": { "allowContexts": [ {"some" { "rules": "here"}} ] },
        "...": "...",
        "locations": [
            {
                "^/admin/": {
                    "accessControl": { "allowContexts": [ {"other" { "rules": "here"}} ] }
                }
            },
            {
                "^/public/": {
                    "accessControl": { "allowContexts": false }
                }
            }
        ]
    }
}
```

**Note:** in this example `accessControl.allowContexts` is enabled at `server` level, overwritten at `/admin/` route since in server `config` arrays are not merged but replaced by the deeper ones, and disabled at `/public/` route.

**Note:** These are just examples of how the configuration is structured, don't copy-paste without analyzing them.

#### Status

Inactive (must be loaded in desired file and used right before execution process), configurable.
